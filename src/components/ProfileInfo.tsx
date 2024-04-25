'use client'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const ProfileInfo = () => {
  const { data: session } = useSession()
  return (
    <div>
      <div className="flex items-center gap-4">
        <Image
          src={session?.user?.image!}
          alt="user image"
          width={100}
          height={100}
          className="w-20 h-20 object-cover rounded-full"
        />
        <div>
            <h2 className="text-lg font-bold text-designColor">Username:</h2>
            <p className="text-gray-800 font-semibold">{session?.user?.name}</p>
            <h2 className="text-lg font-bold mt-2 text-designColor">Email:</h2>
            <p className="text-gray-800 font-semibold">{session?.user?.email}</p>
        </div>
      </div>
      <button
        onClick={() => signOut()}
        className="uppercase bg-zinc-950 text-zinc-200 px-8 py-3 font-semibold rounded-md shadow-md mt-10 hover:bg-designColor hover:text-black duration-200"
      >
        Signout
      </button>
    </div>
  )
}

export default ProfileInfo
