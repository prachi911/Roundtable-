
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types';
import { Gavel, Menu, X } from 'lucide-react';

type HeaderProps = {
  currentRole: UserRole | null;
  setCurrentRole: (role: UserRole | null) => void;
};

const Header = ({ currentRole, setCurrentRole }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roleText = currentRole ? `${currentRole.charAt(0).toUpperCase() + currentRole.slice(1)} Mode` : 'Select Role';
  
  return (
    <header className="bg-navy py-4 px-4 md:px-8 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Gavel className="h-8 w-8 text-gold" />
          <span className="text-white text-2xl font-playfair font-bold">Roundtable</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <nav>
            <ul className="flex space-x-8">
              <li><Link to="/" className="text-white hover:text-gold-light transition-colors">Home</Link></li>
              <li><Link to="/motion-analysis" className="text-white hover:text-gold-light transition-colors">Motion Analysis</Link></li>
              <li><Link to="/events" className="text-white hover:text-gold-light transition-colors">Events</Link></li>
              <li><Link to="/about" className="text-white hover:text-gold-light transition-colors">About</Link></li>
            </ul>
          </nav>
          
          <div className="ml-4">
            {currentRole ? (
              <Button 
                variant="outline" 
                className="border-2 border-white text-white bg-navy-light hover:bg-navy hover:border-gold font-semibold"
                onClick={() => setCurrentRole(null)}
              >
                {roleText}
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="border-2 border-white text-white bg-navy-light hover:bg-navy hover:border-gold font-semibold"
                onClick={() => setCurrentRole(null)}
              >
                {roleText}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-light mt-4 py-4 px-4 rounded-md animate-fade-in">
          <nav className="mb-4">
            <ul className="space-y-4">
              <li><Link to="/" className="text-white hover:text-gold-light transition-colors block">Home</Link></li>
              <li><Link to="/motion-analysis" className="text-white hover:text-gold-light transition-colors block">Motion Analysis</Link></li>
              <li><Link to="/events" className="text-white hover:text-gold-light transition-colors block">Events</Link></li>
              <li><Link to="/about" className="text-white hover:text-gold-light transition-colors block">About</Link></li>
            </ul>
          </nav>
          
          <div>
            {currentRole ? (
              <Button 
                variant="outline" 
                className="border-2 border-white text-white bg-navy-light hover:bg-navy hover:border-gold font-semibold w-full"
                onClick={() => setCurrentRole(null)}
              >
                {roleText}
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="border-2 border-white text-white bg-navy-light hover:bg-navy hover:border-gold font-semibold w-full"
                onClick={() => setCurrentRole(null)}
              >
                {roleText}
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
