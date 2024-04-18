import React from 'react';

const UserDeletePanel: React.FC = () => {
    const handleDeleteUser = async () => {
        try {

            const response = await fetch(`https://job-fair-frontend-but-backend.vercel.app/auth/delete`, {
                method: 'DELETE',
                
            });

            if (response.ok) {
                // If deletion is successful, log the user out
                // Implement your logout logic here
                console.log('User deleted successfully');
            } else {
                
                console.error('Failed to delete user');
            }
        } catch (error) {
            
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="z-50 space-y-2 p-20 items-center flex flex-col">
            <div className="flex flex-col items-center justify-between space-y-3">
                <div className="p-5 text-5xl">Security</div>
            </div>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDeleteUser}>
                Delete User
            </button>
        </div>
    );
};

export default UserDeletePanel;