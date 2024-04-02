import Image from 'next/image';

export default function ProfilePanel() {
  return (
    <div className="z-50 space-y-2 p-20 sm:ml-72">
      <div className="mb-5 border-b-2 p-5 text-5xl">Edit Profile</div>
      <div className="flex h-full flex-col items-center bg-white px-3">
        <Image
          src={'/img/user.png'}
          alt="logo"
          width={100}
          height={100}
          sizes="100vh"
        ></Image>
        <div className="font-semibold hover:text-blue1 hover:underline ">
          Select photo
        </div>

        <form className="mt-5">
          <div className="mb-3 grid gap-3 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                First name
                <input
                  type="text"
                  id="first_name"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                                    text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                                    dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="John"
                />
              </label>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                Last name
                <input
                  type="text"
                  id="last_name"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                                    text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                                    dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Doe"
                />
              </label>
            </div>
          </div>
          <div className="mb-3">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Phone number
              <input
                type="tel"
                id="phone"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                                text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="0811111111"
                pattern="[0-9]{10}"
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Email address
              <input
                type="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                                text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                                dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="user@gmail.com"
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Password
              <input
                type="password"
                id="password"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                            text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                            dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="•••••••••"
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Confirm password
              <input
                type="password"
                id="confirm_password"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 
                            text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white 
                            dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="•••••••••"
              />
            </label>
          </div>
          <div className="mb-6 flex items-start">
            <label className="ms-2 flex flex-row text-sm font-medium text-gray-900 dark:text-gray-300">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="focus:ring-3 mr-2 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <div className="mt-1">
                I agree with the{' '}
                <a
                  href="#"
                  className="text-blue1 hover:underline dark:text-blue1"
                >
                  terms and conditions
                </a>
              </div>
            </label>
          </div>
          <div className="mb-6 flex items-start">
            <button
              type="submit"
              className="w-full rounded-3xl bg-blue-200 px-5 py-2.5 text-center 
            text-sm font-medium text-white hover:bg-blue1"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
