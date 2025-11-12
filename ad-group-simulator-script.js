// Data structures
let users = [];
let groups = [];
let memberships = {}; // { groupName: [members] }
let nestedGroups = {}; // { parentGroup: [childGroups] }

// DOM Elements
const newUserName = document.getElementById('newUserName');
const addUserBtn = document.getElementById('addUserBtn');
const newGroupName = document.getElementById('newGroupName');
const addGroupBtn = document.getElementById('addGroupBtn');
const selectUser = document.getElementById('selectUser');
const selectGroup = document.getElementById('selectGroup');
const addMemberBtn = document.getElementById('addMemberBtn');
const selectChildGroup = document.getElementById('selectChildGroup');
const selectParentGroup = document.getElementById('selectParentGroup');
const addNestedGroupBtn = document.getElementById('addNestedGroupBtn');
const selectUserForCalc = document.getElementById('selectUserForCalc');
const calculateBtn = document.getElementById('calculateBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const currentConfig = document.getElementById('currentConfig');
const effectiveSection = document.getElementById('effectiveSection');
const effectiveDisplay = document.getElementById('effectiveDisplay');
const membershipTreeSection = document.getElementById('membershipTreeSection');
const membershipTree = document.getElementById('membershipTree');

// Event listeners
addUserBtn.addEventListener('click', addUser);
addGroupBtn.addEventListener('click', addGroup);
addMemberBtn.addEventListener('click', addMemberToGroup);
addNestedGroupBtn.addEventListener('click', addNestedGroup);
calculateBtn.addEventListener('click', calculateEffectiveMembership);
clearAllBtn.addEventListener('click', clearAll);

// Enter key support
newUserName.addEventListener('keypress', (e) => { if (e.key === 'Enter') addUser(); });
newGroupName.addEventListener('keypress', (e) => { if (e.key === 'Enter') addGroup(); });

// Add user
function addUser() {
    const username = newUserName.value.trim();
    
    if (!username) {
        alert('Please enter a username');
        return;
    }
    
    if (users.includes(username)) {
        alert('User already exists');
        return;
    }
    
    if (groups.includes(username)) {
        alert('A group with this name already exists');
        return;
    }
    
    users.push(username);
    newUserName.value = '';
    updateDropdowns();
    displayConfiguration();
    newUserName.focus();
}

// Add group
function addGroup() {
    const groupName = newGroupName.value.trim();
    
    if (!groupName) {
        alert('Please enter a group name');
        return;
    }
    
    if (groups.includes(groupName)) {
        alert('Group already exists');
        return;
    }
    
    if (users.includes(groupName)) {
        alert('A user with this name already exists');
        return;
    }
    
    groups.push(groupName);
    memberships[groupName] = [];
    nestedGroups[groupName] = [];
    newGroupName.value = '';
    updateDropdowns();
    displayConfiguration();
    newGroupName.focus();
}

// Add member to group
function addMemberToGroup() {
    const user = selectUser.value;
    const group = selectGroup.value;
    
    if (!user || !group) {
        alert('Please select both user and group');
        return;
    }
    
    if (!memberships[group]) {
        memberships[group] = [];
    }
    
    if (memberships[group].includes(user)) {
        alert('User is already a member of this group');
        return;
    }
    
    memberships[group].push(user);
    displayConfiguration();
}

// Add nested group
function addNestedGroup() {
    const childGroup = selectChildGroup.value;
    const parentGroup = selectParentGroup.value;
    
    if (!childGroup || !parentGroup) {
        alert('Please select both child and parent groups');
        return;
    }
    
    if (childGroup === parentGroup) {
        alert('A group cannot be a member of itself');
        return;
    }
    
    // Check for circular reference
    if (wouldCreateCircular(childGroup, parentGroup)) {
        alert('This would create a circular group membership (not allowed in AD)');
        return;
    }
    
    if (!memberships[parentGroup]) {
        memberships[parentGroup] = [];
    }
    
    if (memberships[parentGroup].includes(childGroup)) {
        alert('This group is already a member of the parent group');
        return;
    }
    
    memberships[parentGroup].push(childGroup);
    
    if (!nestedGroups[parentGroup]) {
        nestedGroups[parentGroup] = [];
    }
    nestedGroups[parentGroup].push(childGroup);
    
    displayConfiguration();
}

// Check if adding a nested group would create a circular reference
function wouldCreateCircular(childGroup, parentGroup) {
    // Check if parent is already a descendant of child
    return isDescendant(parentGroup, childGroup);
}

// Check if potentialDescendant is a descendant of group
function isDescendant(potentialDescendant, group) {
    if (!memberships[group]) return false;
    
    for (const member of memberships[group]) {
        if (groups.includes(member)) { // If member is a group
            if (member === potentialDescendant) return true;
            if (isDescendant(potentialDescendant, member)) return true;
        }
    }
    return false;
}

// Calculate effective membership
function calculateEffectiveMembership() {
    const username = selectUserForCalc.value;
    
    if (!username) {
        alert('Please select a user');
        return;
    }
    
    const effectiveGroups = new Set();
    const membershipPath = {};
    
    // Find all groups user is directly or indirectly a member of
    function findGroupMemberships(entity, path = []) {
        for (const [groupName, members] of Object.entries(memberships)) {
            if (members.includes(entity)) {
                const newPath = [...path, groupName];
                effectiveGroups.add(groupName);
                membershipPath[groupName] = newPath;
                
                // Recursively check parent groups
                findGroupMemberships(groupName, newPath);
            }
        }
    }
    
    findGroupMemberships(username);
    
    // Display results
    if (effectiveGroups.size === 0) {
        effectiveDisplay.innerHTML = '<p class="no-membership">User is not a member of any groups</p>';
        effectiveSection.style.display = 'block';
        membershipTreeSection.style.display = 'none';
        return;
    }
    
    // Display effective groups
    let html = `<div class="effective-summary"><strong>${username}</strong> is effectively a member of <strong>${effectiveGroups.size}</strong> group(s):</div>`;
    html += '<div class="effective-groups">';
    
    const sortedGroups = Array.from(effectiveGroups).sort();
    sortedGroups.forEach(group => {
        const path = membershipPath[group];
        const isDirect = path.length === 1;
        const pathStr = path.join(' → ');
        
        html += `
            <div class="effective-group-item ${isDirect ? 'direct-membership' : 'indirect-membership'}">
                <div class="group-badge">${group}</div>
                <div class="membership-type">${isDirect ? 'Direct' : 'Indirect'}</div>
                <div class="membership-path">${pathStr}</div>
            </div>
        `;
    });
    
    html += '</div>';
    effectiveDisplay.innerHTML = html;
    effectiveSection.style.display = 'block';
    
    // Build membership tree
    buildMembershipTree(username);
}

// Build membership tree visualization
function buildMembershipTree(username) {
    let html = '<div class="tree-root">';
    html += `<div class="tree-node tree-user">${username}</div>`;
    
    // Get direct groups
    const directGroups = [];
    for (const [groupName, members] of Object.entries(memberships)) {
        if (members.includes(username)) {
            directGroups.push(groupName);
        }
    }
    
    if (directGroups.length > 0) {
        html += '<div class="tree-children">';
        directGroups.forEach(group => {
            html += buildGroupNode(group, [username, group]);
        });
        html += '</div>';
    }
    
    html += '</div>';
    membershipTree.innerHTML = html;
    membershipTreeSection.style.display = 'block';
}

// Build group node recursively
function buildGroupNode(groupName, path) {
    let html = '<div class="tree-branch">';
    html += '<div class="tree-connector"></div>';
    html += `<div class="tree-node tree-group">${groupName}</div>`;
    
    // Find parent groups
    const parentGroups = [];
    for (const [parentName, members] of Object.entries(memberships)) {
        if (members.includes(groupName) && !path.includes(parentName)) {
            parentGroups.push(parentName);
        }
    }
    
    if (parentGroups.length > 0) {
        html += '<div class="tree-children">';
        parentGroups.forEach(parent => {
            html += buildGroupNode(parent, [...path, parent]);
        });
        html += '</div>';
    }
    
    html += '</div>';
    return html;
}

// Display current configuration
function displayConfiguration() {
    if (users.length === 0 && groups.length === 0) {
        currentConfig.innerHTML = '<p class="empty-state">Add users and groups to get started</p>';
        return;
    }
    
    let html = '';
    
    // Display users
    if (users.length > 0) {
        html += '<div class="config-section">';
        html += `<h4>Users (${users.length})</h4>`;
        html += '<div class="entity-list">';
        users.forEach(user => {
            html += `<span class="entity-badge user-badge">${user}</span>`;
        });
        html += '</div></div>';
    }
    
    // Display groups with members
    if (groups.length > 0) {
        html += '<div class="config-section">';
        html += `<h4>Groups (${groups.length})</h4>`;
        
        groups.forEach(group => {
            const members = memberships[group] || [];
            const userMembers = members.filter(m => users.includes(m));
            const groupMembers = members.filter(m => groups.includes(m));
            
            html += `
                <div class="group-detail">
                    <div class="group-header">
                        <span class="entity-badge group-badge">${group}</span>
                        <span class="member-count">${members.length} member(s)</span>
                    </div>
            `;
            
            if (members.length > 0) {
                html += '<div class="member-list">';
                
                if (userMembers.length > 0) {
                    html += '<div class="member-category"><strong>Users:</strong> ';
                    userMembers.forEach((member, idx) => {
                        html += `<span class="member-item">${member}</span>`;
                        if (idx < userMembers.length - 1) html += ', ';
                    });
                    html += '</div>';
                }
                
                if (groupMembers.length > 0) {
                    html += '<div class="member-category"><strong>Groups:</strong> ';
                    groupMembers.forEach((member, idx) => {
                        html += `<span class="member-item nested-indicator">${member}</span>`;
                        if (idx < groupMembers.length - 1) html += ', ';
                    });
                    html += '</div>';
                }
                
                html += '</div>';
            }
            
            html += '</div>';
        });
        
        html += '</div>';
    }
    
    currentConfig.innerHTML = html;
}

// Update dropdowns
function updateDropdowns() {
    // Update user dropdowns
    [selectUser, selectUserForCalc].forEach(dropdown => {
        const currentValue = dropdown.value;
        dropdown.innerHTML = '<option value="">Select User...</option>';
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user;
            option.textContent = user;
            dropdown.appendChild(option);
        });
        if (users.includes(currentValue)) {
            dropdown.value = currentValue;
        }
    });
    
    // Update group dropdowns
    [selectGroup, selectChildGroup, selectParentGroup].forEach(dropdown => {
        const currentValue = dropdown.value;
        dropdown.innerHTML = '<option value="">Select Group...</option>';
        groups.forEach(group => {
            const option = document.createElement('option');
            option.value = group;
            option.textContent = group;
            dropdown.appendChild(option);
        });
        if (groups.includes(currentValue)) {
            dropdown.value = currentValue;
        }
    });
}

// Clear all
function clearAll() {
    if (!confirm('Clear all users, groups, and memberships?')) {
        return;
    }
    
    users = [];
    groups = [];
    memberships = {};
    nestedGroups = {};
    
    updateDropdowns();
    displayConfiguration();
    
    effectiveSection.style.display = 'none';
    membershipTreeSection.style.display = 'none';
}

// Initialize
displayConfiguration();
