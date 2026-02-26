import { Link } from '@tanstack/react-router';

import Logo from '@/components/logo/Logo';

import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className='fixed top-0 left-0 w-full p-4'>
      <div
        className=' container h-16 backdrop-blur-3xl rounded-xl 
      flex justify-between items-center border'
      >
        <Link to='/'>
          <Logo />
        </Link>

        <div className='flex items-center gap-2'>
          <Button
            asChild
            variant='ghost'
          >
            <Link to='/login'>
              Sign in
            </Link>
          </Button>

          <Button asChild>
            <Link to='/register'>
              Start for free
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
