 // Function to get the initials of the doctor
  export const getInitials = (name) => {
    const nameParts = name
      .split(" ")
      .filter((part) => part.toLowerCase() !== "dr."); // Exclude "Dr"
    return nameParts
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };
