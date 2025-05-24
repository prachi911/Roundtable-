
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

type RoleSelectorProps = {
  selectedRole: UserRole | null;
  onSelectRole: (role: UserRole) => void;
};

const RoleSelector = ({ selectedRole, onSelectRole }: RoleSelectorProps) => {
  const roles: { id: UserRole; title: string; description: string }[] = [
    {
      id: 'admin',
      title: 'Admin / Host',
      description: 'Create and manage debate events, set motions, and oversee competitions'
    },
    {
      id: 'participant',
      title: 'Participant',
      description: 'Prepare arguments, practice speeches, and compete in debate rounds'
    },
    {
      id: 'judge',
      title: 'Judge',
      description: 'Evaluate debates, provide feedback, and score participants'
    },
    {
      id: 'spectator',
      title: 'Spectator',
      description: 'Watch debates and follow competitions without active participation'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {roles.map((role) => (
        <Card 
          key={role.id} 
          className={`cursor-pointer transition-all h-full ${
            selectedRole === role.id 
              ? 'border-2 border-gold shadow-lg transform scale-[1.02]' 
              : 'border border-gray-200 hover:shadow-md hover:border-gold hover:border-opacity-50'
          }`}
          onClick={() => onSelectRole(role.id)}
        >
          <CardHeader className="relative pb-2">
            {selectedRole === role.id && (
              <div className="absolute top-2 right-2 bg-gold rounded-full p-1.5">
                <Check className="h-5 w-5 text-white" />
              </div>
            )}
            <CardTitle className="text-navy text-2xl">{role.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-700 text-base min-h-[80px]">
              {role.description}
            </CardDescription>
            <Button 
              variant={selectedRole === role.id ? "default" : "outline"} 
              className={`mt-6 w-full py-5 text-base font-semibold ${
                selectedRole === role.id 
                  ? 'bg-navy hover:bg-navy-dark' 
                  : 'text-navy border-navy hover:bg-navy hover:text-white'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onSelectRole(role.id);
              }}
            >
              {selectedRole === role.id ? 'Selected' : 'Select Role'}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RoleSelector;
