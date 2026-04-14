import { useContext, useState } from 'react';
import ThemeContext from '../context/ThemeContext';
import { Moon, Sun, Bell, Shield, Smartphone } from 'lucide-react';

const Settings = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in pb-12">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Settings</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your application preferences and account security.</p>
      </div>

      {/* Appearance Section */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
           <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 p-2 rounded-xl">
             {isDark ? <Moon size={24} /> : <Sun size={24} />}
           </div>
           <h3 className="text-xl font-bold text-gray-900 dark:text-white">Appearance</h3>
        </div>
        
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-6 mb-6">
           <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">Theme Preference</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Switch between light and dark modes easily.</p>
           </div>
           <button 
             onClick={toggleTheme} 
             className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${isDark ? 'bg-primary-500' : 'bg-gray-300'}`}
           >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isDark ? 'translate-x-8' : 'translate-x-1'}`} />
           </button>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
           <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-xl">
             <Bell size={24} />
           </div>
           <h3 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h3>
        </div>
        
        <div className="space-y-6">
           <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-6">
              <div>
                 <p className="font-semibold text-gray-800 dark:text-gray-200">Push Notifications</p>
                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Receive alerts when approaching budget limits.</p>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)} 
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${notifications ? 'bg-primary-500' : 'bg-gray-300'}`}
              >
                 <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${notifications ? 'translate-x-8' : 'translate-x-1'}`} />
              </button>
           </div>
           <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-6">
              <div>
                 <p className="font-semibold text-gray-800 dark:text-gray-200">Marketing Emails</p>
                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Receive weekly financial tips directly to your inbox.</p>
              </div>
              <button 
                onClick={() => setMarketing(!marketing)} 
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${marketing ? 'bg-primary-500' : 'bg-gray-300'}`}
              >
                 <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${marketing ? 'translate-x-8' : 'translate-x-1'}`} />
              </button>
           </div>
        </div>
      </div>

    </div>
  );
};

export default Settings;
