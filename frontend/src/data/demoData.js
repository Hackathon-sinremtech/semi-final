export const demoData = {
  appointments: [
    {
      id: "APT-1001",
      doctorId: 1,
      patient: {
        name: "John Doe",
        email: "john@example.com",
        phone: "(555) 123-4567"
      },
      date: "2024-03-15",
      time: "10:00 AM",
      duration: 30,
      status: "confirmed",
      reason: "Annual Checkup",
      location: "Clinic",
      paymentStatus: "paid"
    },
    {
      id: "APT-1002",
      doctorId: 2,
      patient: {
        name: "Sarah Smith",
        email: "sarah@example.com",
        phone: "(555) 987-6543"
      },
      date: "2024-03-16",
      time: "2:30 PM",
      duration: 45,
      status: "pending",
      reason: "Skin Allergy Follow-up",
      location: "Virtual",
      paymentStatus: "unpaid"
    },
    // Add more appointments...
    ...Array.from({ length: 18 }, (_, i) => ({
      id: `APT-10${20 + i}`,
      doctorId: (i % 5) + 1,
      patient: {
        name: `Patient ${i + 1}`,
        email: `patient${i + 1}@example.com`,
        phone: `(555) 555-${1000 + i}`
      },
      date: `2024-03-${17 + (i % 10)}`,
      time: `${9 + (i % 8)}:${i % 2 === 0 ? '00' : '30'} ${i < 4 ? 'AM' : 'PM'}`,
      duration: [30, 45, 60][i % 3],
      status: ["confirmed", "pending", "cancelled", "completed"][i % 4],
      reason: ["Follow-up", "Consultation", "Checkup", "Treatment"][i % 4],
      location: ["Clinic", "Virtual"][i % 2],
      paymentStatus: ["paid", "unpaid", "partial"][i % 3]
    }))
  ],
  dashboard: {
    stats: [
      { title: 'Total Appointments', value: '245', change: '+12%', color: 'blue' },
      { title: 'Upcoming', value: '32', change: '-5%', color: 'purple' },
      { title: 'Doctors', value: '15', change: '+3%', color: 'green' },
      { title: 'Revenue', value: '₹8,420', change: '+18%', color: 'orange' },
    ],
    chartData: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Appointments',
        data: [12, 19, 8, 15, 12, 10, 4],
        borderColor: '#3B82F6',
        backgroundColor: '#3B82F620',
      }]
    }
  },
  doctors: Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Dr. ${['Sarah', 'Michael', 'Lisa', 'James', 'Emily'][i % 5]} ${['Johnson', 'Chen', 'Patel', 'Smith', 'Wilson'][i % 5]}`,
    specialty: ['Cardiology', 'Dermatology', 'Orthopedics', 'Pediatrics', 'Neurology'][i % 5],
    experience: 5 + (i % 10),
    available: i % 3 !== 0,
    appointments: 25 + (i * 3),
    rating: (4 + (i * 0.1)).toFixed(1)
  })),
  services: [
    { id: 1, name: 'General Consultation', duration: '30 mins', price: '$100' },
    { id: 2, name: 'Specialist Consultation', duration: '45 mins', price: '$200' },
    { id: 3, name: 'Follow-up Visit', duration: '15 mins', price: '$50' },
  ],
  settings: {
    workingHours: {
      start: '09:00',
      end: '18:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    appointmentSettings: {
      slotDuration: 30,
      maxDaily: 20,
      bufferTime: 15
    }
  }
};