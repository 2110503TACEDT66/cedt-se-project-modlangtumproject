import { render, screen } from '@testing-library/react';
import TopMenu from '@/components/TopMenu';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

jest.mock('next-auth/react', () => ({
  useSession: () => ({ data: null, user: { name: 'John Doe' } }),
}));

describe('TopMenu Component', () => {
  it('renders without crashing', () => {
    render(<TopMenu />);
    expect(screen.getByText('Mu Hung')).toBeInTheDocument();

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
    expect(screen.getByText('Session')).toBeInTheDocument();
  });

  it('displays login and register links when not authenticated', async () => {
    render(<TopMenu />);
    expect(await screen.findByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });
});
