import React from 'react';


const NavBar = ({ accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        //if metamask exist in browser
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                //all accounts exists in metamask wallet
                method: 'eth_requestAccounts'
            });
            setAccounts(accounts)
        }
    }

    return (
        <div>
            {/* left side - social media */}
            <div>Facebook</div>
            <div>Twitter</div>
            <div>Email</div>

            {/* Righte side - Section Connect */}
            <div>About</div>
            <div>Mint</div>
            <div>Team</div>

            {/* Connect Check */}
            {isConnected ? (
                <p>Connected</p>
            ) : (
                <button onClick={connectAccount}>Connect</button> 
            )}
        </div>
    )
 }

 export default NavBar;