export default function ProfileCard({ user }) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold dark:text-gray-200 mb-4">Your Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Company Name:</strong> {user.companyName}</p>
        {user.website && (
          <p><strong>Website:</strong> <a href={user.website} className="text-blue-500 hover:underline">{user.website}</a></p>
        )}
      </div>
    );
  }
  