import Image from "next/image";

export const Profile = () => {
  const userName = 'Kerem';
  return (
    <div className='flex items-center justify-center'>
      <span>
        <Image src='/icons/profile.svg' alt='profile' width={20} height={20} style={{ width: 'auto', height: 'auto' }} />
      </span>
      <p className='text-base font-normal text-header-text-color'> {userName} </p>
    </div>
  );
};
