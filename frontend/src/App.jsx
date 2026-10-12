import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.age || !formData.course) {
      setMessage("All fields are required");
      return;
    }

    if (formData.name.length < 3) {
      setMessage("Name must contain at least 3 characters");
      return;
    }

    if (!formData.email.includes("@")) {
      setMessage("Please enter a valid email");
      return;
    }

    if (formData.age < 18 || formData.age > 60) {
      setMessage("Age must be between 18 and 60");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/students`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...formData,
            age: Number(formData.age)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      setMessage("Student added successfully!");

      setFormData({
        name: "",
        email: "",
        age: "",
        course: ""
      });
    } catch (error) {
      setMessage("Server connection failed");
    }
  };

  return (
    <div style={{ width: "400px", margin: "50px auto" }}>
      <h1>Student Registration</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={formData.age}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="course"
          placeholder="Enter Course"
          value={formData.course}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Add Student
        </button>
      </form>

      <h3>{message}</h3>
    </div>
  );
}

export default App;