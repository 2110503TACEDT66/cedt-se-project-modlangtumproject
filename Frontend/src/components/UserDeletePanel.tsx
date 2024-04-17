import React from 'react';

const UserDeletePanel: React.FC = () => {
    const handleDeleteUser = () => {
        // TODO: Implement the logic to delete the user and log them out automatically
        // You can use an API call or any other method to delete the user and handle the logout process
    };

    return (
        <div className="z-50 space-y-2 p-20 items-center flex flex-col">
            <div className="flex flex-col items-center justify-between space-y-3">
                <div className="p-5 text-5xl">Security</div>
            </div>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete User
            </button>
        </div>
    );
};

export default UserDeletePanel;