import { demoData } from '../../data/demoData';

const SettingsPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Practice Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Working Hours */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Working Hours</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Days:</span>
              <span className="font-medium">
                {demoData.settings.workingHours.days.join(', ')}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Start Time:</span>
              <span className="font-medium">
                {demoData.settings.workingHours.start}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">End Time:</span>
              <span className="font-medium">
                {demoData.settings.workingHours.end}
              </span>
            </div>
          </div>
        </div>

        {/* Appointment Settings */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Appointment Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Slot Duration:</span>
              <span className="font-medium">
                {demoData.settings.appointmentSettings.slotDuration} mins
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Max Daily Appointments:</span>
              <span className="font-medium">
                {demoData.settings.appointmentSettings.maxDaily}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Buffer Time:</span>
              <span className="font-medium">
                {demoData.settings.appointmentSettings.bufferTime} mins
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;