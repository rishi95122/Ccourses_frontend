# Project Description
  CCourses is a web-based platform designed to facilitate seamless interaction between teachers and students by providing a streamlined course-sharing experience. The application allows teachers to create and upload educational content, while students can browse and access these courses at their convenience. The system is built with a React.js frontend for a dynamic and responsive user interface, and a robust Node.js/MongoDB
  backend for efficient data management. For media storage, Cloudinary is used to securely manage videos and images.

#Features
  #User Registration and Authentication
  
    Role-Based Signup: Users can register either as a Teacher or Student with differentiated permissions.
    Secure Authentication: Login and registration are secured with JWT-based authentication to protect user data.
  
  #Teacher Features
  1.Course Creation and Upload:
      Teachers can upload courses via two options:
          -YouTube Integration: Share content directly via YouTube links.
          -Direct Upload: Upload videos and course-related media from their local devices.
      Metadata such as course title, description, and category can be added for better organization.
  
  2.Media Management:
      Uploaded videos and images are stored and served using Cloudinary, ensuring high performance and secure delivery.
      Dashboard:
      -View and manage their list of uploaded courses.
      -Update or delete existing courses.
      
#Student Features
1.Course Browsing:
    Students can explore available courses with an intuitive interface categorized by subject or relevance.
    Courses are displayed with detailed metadata, including descriptions, thumbnails, and teacher information.
    
2.Course Viewing:
    Play videos directly on the platform using an embedded media player for a smooth viewing experience.

    
# How to start the project

1. **Clone the repository:**

    ```bash
    https://github.com/rishi95122/Udemy_frontend.git
    ```
    
2. **Navigate to the project directory:**

    ```bash
    cd Udemy_frontend
    ```
    
3. **Install dependencies:**

    ```bash
    npm install
    ```

### Configuration

1. **Create a `.env` file** in the root directory of the project.

2. **Add env files which are submitted in form to the `.env` file**. Example format:

## Running the project

1. **Start the project:**

    ```bash
    npm start
    ```

Thanks
