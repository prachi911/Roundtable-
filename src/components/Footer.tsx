
import { Link } from 'react-router-dom';
import { Gavel } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy text-white py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Gavel className="h-6 w-6 text-gold" />
              <span className="text-xl font-playfair font-bold">Roundtable</span>
            </Link>
            <p className="text-gray-300 text-sm">
              Your AI-powered debate assistant for preparation,
              practice, and performance.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 font-playfair">Platform</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/motion-analysis" className="hover:text-gold-light transition-colors">Motion Analysis</Link></li>
              <li><Link to="/speech-generator" className="hover:text-gold-light transition-colors">Speech Generator</Link></li>
              <li><Link to="/research" className="hover:text-gold-light transition-colors">Research Assistant</Link></li>
              <li><Link to="/practice" className="hover:text-gold-light transition-colors">Practice Arena</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 font-playfair">Resources</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/formats" className="hover:text-gold-light transition-colors">Debate Formats</Link></li>
              <li><Link to="/tips" className="hover:text-gold-light transition-colors">Debate Tips</Link></li>
              <li><Link to="/faq" className="hover:text-gold-light transition-colors">FAQ</Link></li>
              <li><Link to="/tutorials" className="hover:text-gold-light transition-colors">Tutorials</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 font-playfair">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/terms" className="hover:text-gold-light transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-gold-light transition-colors">Privacy Policy</Link></li>
              <li><Link to="/contact" className="hover:text-gold-light transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Roundtable. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
