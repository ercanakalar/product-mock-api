import { ReactComponent as ProfileIcon } from '../../../assets/icons/profile.svg';

export const Profile = () => {
  const userName = 'Kerem';
  return (
    <div className='flex items-center justify-center'>
      <span className=''>
        <ProfileIcon className='w-6 h-6 text-gray-500' />
      </span>
      <p className='text-base font-normal text-headerTextColor'> {userName} </p>
    </div>
  );
};
