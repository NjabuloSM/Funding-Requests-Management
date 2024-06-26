import { getUser, getAllUsers } from "../modules/users.js";
import { getAllFundingOpportunities } from "../modules/funding.js";
import { getfundingByName, deleteFundingOpportunity } from "../modules/funding.js";


const searchUser = document.getElementById('search-user');
const userBtn = document.getElementById('user-Search');
const searchOpportunity = document.getElementById('search-opportunity');
const opportunitydBtn = document.getElementById('opportunity-Search');
const allUserBtn = document.getElementById('user-all-Search');
const allFundBtn = document.getElementById('opportunity-all-Search'); 
const sec = document.getElementById('user-section');

//const userdetails = document.getElementById('user-details');
//const fullDiv = document.getElementById('user-details');
//const userInfo = document.getElementById('user-info');
var currentUser;
var allUsers;
var allFunds;
var fundingOpportunity;
var userEmail;
var fundName;

/*
*
*
*/
async function SearchForUser(){
    userEmail = searchUser.value;
    if(!userEmail){
        console.log('Enter user Details');
        return;
    }
    currentUser = await getUser(userEmail);
    if(!currentUser){
        console.log('User not found');
        return
    }
    displayUser();
    console.log('User found');
}

userBtn.addEventListener('click',()=>{
    SearchForUser();
});


/*
*
*
*/
async function searchFundOpportunity(){
    fundName = searchOpportunity.value;
    if(!fundName){
        console.log('Please enter a Funding Opportunity');
        return;
    }
    fundingOpportunity = await getfundingByName(fundName);
    if(!fundingOpportunity){
        console.log('Funding Opportunity not found');
        return;
    }
    console.log(fundingOpportunity);
    displayOpportunity();
    console.log('Funding Opportunity found');
}

opportunitydBtn.addEventListener('click', ()=>{
    searchFundOpportunity();
});


sec.addEventListener('click', async (event) => {
    if (event.target.classList.contains('approve-btn')) {
        //console.log('clicked accept btn');
        approveUser();
    }
  
    else if (event.target.classList.contains('block-btn')) {
        //console.log('clicked block btn');
        blockUser();
    }
  
  
    else if(event.target.classList.contains('permissions-btn')){
        //console.log('clicked permissions btn');
        changePermissions();
    }

    else if(event.target.classList.contains('remove-btn')){
        const index = event.target.dataset.index;
        var fundName;
        if(index){
            console.log('clicked remove btn at: ', index);
            fundName = allFunds[index].Name;
            await deleteFundingOpportunity(fundName);
            await SearchAllFunds();
        }else{
            fundName = fundingOpportunity;
            await deleteFundingOpportunity(fundName);
            sec.innerHTML = ``;
            sec.style.boxShadow ='none';
        }
        
        //console.log('clicked remove btn');

    }
});



/*
*
*
*/
async function approveUser(){
    console.log('User Approved');
}




/*
*
*
*/
async function blockUser(){
    console.log('User Blocked');
}




/*
*
*
*/
async function changePermissions(){
    console.log('Permissions changed');
}



function displayUser(){
    sec.innerHTML = ``;
    const userInfo = document.createElement('table');
    userInfo.className='user-table';

    userInfo.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Daniel</td>
                <td>${currentUser.Email}</td>
                <td>${currentUser.Role}</td>
                <td class='btn'>
                    <input id='btns' class="approve-btn" type="button" value='Approve'>
                    <input id='btns' class="block-btn" type="button" value='block'>
                    <input id='btns' class="permissions-btn" type="button" value='Permissions'>
                </td>
            </tr>
        </tbody>
    `;
    sec.appendChild(userInfo);
    sec.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
}



function displayOpportunity(){
    sec.innerHTML = ``;
    const userInfo = document.createElement('table');
    userInfo.className='user-table';

    userInfo.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Deadline</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${fundingOpportunity.Name}</td>
                <td>${fundingOpportunity.ClosingDate}</td>
                <td>${fundingOpportunity.Description}</td>
                <td class='btn'>
                    <input id='btns' class="remove-btn"  type="button" value='Remove'>
                </td>
            </tr>
        </tbody>
    `;
    sec.appendChild(userInfo);
    sec.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
}





allUserBtn.addEventListener('click', ()=>{
    SearchAllUsers()
});

async function SearchAllUsers(){
    allUsers = await getAllUsers();
    if(allUsers.empty){
        console.log('There are currently no funding Opportunities');
        return;
    }

    displayAllUsers();
    console.log('Successfully displayed all users');
}

function displayAllUsers(){
    sec.innerHTML = ``;
    const userTable = document.createElement('table');
    userTable.className='user-table';

    const header = document.createElement('thead');
    header.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
        </tr>
    `;
    userTable.appendChild(header);

    allUsers.forEach((user, index) => {
        const userInfo = document.createElement('tbody');
        userInfo.innerHTML = `
            <tr>
                <td>Daniel</td>
                <td>${user.Email}</td>
                <td>${user.Role}</td>
                <td class='btn'>
                    <input id='btns' class="approve-btn" data-index="${index}" type="button" value='Approve'>
                    <input id='btns' class="block-btn" data-index="${index}" type="button" value='block'>
                    <input id='btns' class="permissions-btn" data-index="${index}" type="button" value='Permissions'>
                </td>
            </tr>
        `;
        userTable.appendChild(userInfo);
    });

    sec.appendChild(userTable);
    sec.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
}



allFundBtn.addEventListener('click', ()=>{
    SearchAllFunds()
});

async function SearchAllFunds(){
    allFunds = await getAllFundingOpportunities();
    if(allFunds.empty){
        console.log('There are currently no funding Opportunities');
        return;
    }

    displayAllFunds();
    console.log('Successfully displayed all users');
}

function displayAllFunds(){
    console.log(allFunds)
    sec.innerHTML = ``;
    const fundTable = document.createElement('table');
    fundTable.className='user-table';

    const header = document.createElement('thead');
    header.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Deadline</th>
            <th>Description</th>
            <th>Actions</th>
        </tr>
    `;
    fundTable.appendChild(header);

    allFunds.forEach((fund, index) => {
        const fundInfo = document.createElement('tbody');
        fundInfo.innerHTML = `
            <tr>
                <td>${fund.Name}</td>
                <td>${fund.ClosingDate}</td>
                <td>${fund.Description}</td>
                <td class='btn'>
                    <input id='btns' class="remove-btn" data-index="${index}" type="button" value='Remove'>
                </td>
            </tr>
        `;
        fundTable.appendChild(fundInfo);
    });

    sec.appendChild(fundTable);
    sec.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
}