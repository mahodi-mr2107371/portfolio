"use client";
import { useState, useEffect, useRef, createContext, useContext } from 'react';
import Head from 'next/head';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaArrowDown, FaMoon, FaSun, FaExternalLinkAlt } from 'react-icons/fa';

// Define types for our data
type Experience = {
  id: number;
  title: string;
  company: string;
  duration: string;
  description: string;
};

type Education = {
  id: number;
  degree: string;
  institution: string;
  duration: string;
  description: string;
};

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string;
};

type Skill = {
  name: string;
  level: number;
};

// Theme context
type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => { },
});

// Theme provider component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Check for saved preference or system preference
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    } else {
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Sample data
const experiences: Experience[] = [
  {
    id: 1,
    title: "Full Stack Crossplatform Mobile Application Developer",
    company: "SightSense",
    duration: "May 2024 - July 2024",
    description: "Designed and built scalable crossplatform mobile application with Backend storage and Machine learning model service. Worked with Flutter, Supabase, and Python Scripts for Machine learning Algorithms. Collaborated with design team to implement UI/UX improvements, and with development team to integrate the services and application with their company's applications."
  },
  {
    id: 2,
    title: "IT Intern",
    company: "QAFCO",
    duration: "May 2024 - July 2024",
    description: "IT inter at QAFCO IT operations department where I acquired hands on experience on Network infrastructure operations, Network Security and Security Protocols, Azure Cloud Service management."
  }
];

const education: Education[] = [
  {
    id: 1,
    degree: "A levels Degree",
    institution: "Bright Future International School",
    duration: "2017 - 2021",
    description: "Pre-Engineering Concentration"
  },
  {
    id: 2,
    degree: "BSc in Computer Science",
    institution: "Qatar University",
    duration: "2021 - 2025",
    description: "Focused on programming fundamentals, databases, Software Engineering, Fundamentals of Machine Learning Engineering, Network and Software Security, Data Science, and Integration and Training of NPL models into Softwares solutions"
  }
];

const projects: Project[] = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    description: "Full Stack Banking Web application using Next Js Framework with database integration using mongoDB.",
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
    image: "/project1.jpg",
    link: "https://github.com/mahodi-mr2107371/Projects/tree/dd10c85435957184bf1a0ded29a8363d8e309208/webDev"
  },
  {
    id: 2,
    title: "Advanced Data Structure Implementation",
    description: "Developed an optimized student management system using a hash table with tree-based storage, integrating BSTs and hash functions with linear probing for efficiency. Implemented GPA-based filtering, highest GPA retrieval, year-wise student count, and ensured data persistence through file storage.",
    technologies: ["Java"],
    image: "/project2.jpg",
    link: "https://github.com/mahodi-mr2107371/Projects/tree/dd10c85435957184bf1a0ded29a8363d8e309208/Data_Structure_student_system"
  },
  {
    id: 3,
    title: "Full-Stack Cross Platform Mobile Development",
    description: "Used Flutter framework and dart programming language to design and build full scale, modular, deployment ready mobile application capable of storing data in both offline and online database. Database integration done using firebase, Authentication done using fireAuth services. ",
    technologies: ["Dart", "Flutter", "SupaBase", "Firebase"],
    image: "/project3.jpg",
    link: "https://github.com/mahodi-mr2107371/Projects/tree/dd10c85435957184bf1a0ded29a8363d8e309208/Mobile_Development_Flutter"
  },
  {
    id: 4,
    title: "Machine Leaning",
    description: "Using python, Built mutiple machine learning models capable of analyzing, predicting, and plotting graphs.",
    technologies: ["Python", "Pytorch", "Panda"],
    image: "/project4.jpg",
    link: "https://github.com/mahodi-mr2107371/Projects/tree/dd10c85435957184bf1a0ded29a8363d8e309208/End-To-End_Machine_Learning_Project"
  },
  {
    id: 5,
    title: "Operating systems",
    description: "Used operating system concepts to setup virtual machines and write scripts that allow connection and communication between machines over the network using bash and C scripts. Used Java to build full-scale game server and client machines able to seamlessly connect and communicate with server. ",
    technologies: ["C", "Linux", "Java", "VMWare"],
    image: "/project5.jpg",
    link: "https://github.com/mahodi-mr2107371/Projects/tree/dd10c85435957184bf1a0ded29a8363d8e309208/Operating%20Systems"
  },
  {
    id: 6,
    title: "Custom CPU",
    description: "Used LogiSim and Assembly to Create a Custom functioning CPU architecture",
    technologies: ["LogiSim", "Assembly"],
    image: "/project6.jpg",
    link: "https://github.com/mahodi-mr2107371/Projects/tree/dd10c85435957184bf1a0ded29a8363d8e309208/Custom_CPU"
  }
];

const skills: Skill[] = [
  { name: "React & Next.js", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "Flutter", level: 80 },
  { name: "MongoDB", level: 75 },
  { name: "Firebase", level: 85 },
  { name: "Supabase", level: 70 },
];

const PortfolioWebsite = () => {
  const [senderEmail, setSenderEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('about');
  const [showScrollIndicator, setShowScrollIndicator] = useState<boolean>(true);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { scrollY } = useScroll();

  const aboutRef = useRef<HTMLElement | null>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Animation variants
  const CursorTrail = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVisible, setCursorVisible] = useState(false);

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setCursorVisible(true);
      };

      const handleMouseLeave = () => {
        setCursorVisible(false);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, []);

    return (
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          opacity: cursorVisible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      >
        <div className="w-8 h-8 bg-blue-500 rounded-full opacity-20 blur-sm" />
      </motion.div>
    );
  };
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.6
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const navbarOpacity = useTransform(scrollY, [0, 100], [0.9, 1]);
  const navbarBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(8px)"]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Hide scroll indicator after scrolling down
      if (scrollPosition > window.innerHeight / 2) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }

      // Determine active section based on scroll position
      const sections = [
        { id: 'about', ref: aboutRef },
        { id: 'experience', ref: experienceRef },
        { id: 'education', ref: educationRef },
        { id: 'skills', ref: skillsRef },
        { id: 'projects', ref: projectsRef },
        { id: 'contact', ref: contactRef }
      ];

      for (const section of sections) {
        if (section.ref.current) {
          const { offsetTop, offsetHeight } = section.ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!senderEmail || !message) return;

    setFormStatus('submitting');

    // Simulate form submission
    setTimeout(() => {
      // In a real app, you'd send this to your backend or a service like FormSubmit
      console.log('Message sent from:', senderEmail, 'with message:', message);
      setFormStatus('success');
      setSenderEmail('');
      setMessage('');

      // Reset form status after a delay
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1000);
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/mahodicv.pdf'; // This path is relative to the public folder
    link.download = 'mahodi_resume.pdf';
    link.click();
  };

  // const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
  //   sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  //   setMobileMenuOpen(false);
  // };
  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(true);
  };

  return (
    <>
      <CursorTrail />
      <div className={`transition-colors duration-500 ${darkMode ? 'dark' : ''}`}>

        <div className={`transition-colors duration-500 ${darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gradient-to-b from-white to-gray-50 text-gray-800'}`}>
          <Head>
            <title>Mahodi Hasan Sabab | Portfolio</title>
            <meta name="description" content="Professional portfolio showcasing my skills and experience" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg ${darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-white text-gray-800'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
          </motion.button>

          {/* Navigation */}
          <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-md backdrop-blur-sm transition-colors duration-500`}
            style={{
              opacity: navbarOpacity,
              backdropFilter: navbarBlur
            }}
          >
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center py-4">
                <motion.div
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className={`bg-gradient-to-r ${darkMode ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'} text-transparent bg-clip-text`}>
                    Mahodi's Portfolio
                  </span>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-8">
                  {[
                    { name: 'About', ref: aboutRef, id: 'about' },
                    { name: 'Experience', ref: experienceRef, id: 'experience' },
                    { name: 'Education', ref: educationRef, id: 'education' },
                    { name: 'Skills', ref: skillsRef, id: 'skills' },
                    { name: 'Projects', ref: projectsRef, id: 'projects' },
                    { name: 'Contact', ref: contactRef, id: 'contact' }
                  ].map((item, index) => (

                    <motion.button
                      key={item.id}
                      onClick={() => {
                        if (item.ref?.current) {
                          scrollToSection(item.ref);
                        }
                      }}
                      className={`relative ${activeSection === item.id
                        ? `${darkMode ? 'text-blue-400' : 'text-blue-600'} font-medium`
                        : `${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'}`} 
                                        transition-colors duration-300`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      {item.name}
                      {activeSection === item.id && (
                        <motion.div
                          className={`absolute bottom-0 left-0 right-0 h-0.5 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'}`}
                          layoutId="activeSection"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                  <motion.button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={`p-2 rounded-md ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {mobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      )}
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  className={`md:hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="container mx-auto px-4 py-3">
                    {[
                      { name: 'About', ref: aboutRef, id: 'about' },
                      { name: 'Experience', ref: experienceRef, id: 'experience' },
                      { name: 'Education', ref: educationRef, id: 'education' },
                      { name: 'Skills', ref: skillsRef, id: 'skills' },
                      { name: 'Projects', ref: projectsRef, id: 'projects' },
                      { name: 'Contact', ref: contactRef, id: 'contact' }
                    ].map((item) => (
                      <motion.button
                        key={item.id}
                        onClick={() => {
                          if (item.ref?.current) {
                            scrollToSection(item.ref);
                          }
                        }}
                        className={`block w-full text-left py-3 ${activeSection === item.id
                          ? `${darkMode ? 'text-blue-400' : 'text-blue-600'} font-medium`
                          : `${darkMode ? 'text-gray-300' : 'text-gray-600'}`}`}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.name}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>

          {/* Hero Section */}
          <section
            ref={aboutRef}
            className="flex items-center justify-center min-h-screen pt-16 relative overflow-hidden"
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 z-0 pointer-events-none"
              animate={{
                background: darkMode
                  ? [
                    'radial-gradient(circle at 20% 30%, rgba(30, 64, 175, 0.15) 0%, rgba(17, 24, 39, 0) 50%)',
                    'radial-gradient(circle at 80% 70%, rgba(109, 40, 217, 0.15) 0%, rgba(17, 24, 39, 0) 50%)',
                    'radial-gradient(circle at 40% 80%, rgba(30, 64, 175, 0.15) 0%, rgba(17, 24, 39, 0) 50%)',
                    'radial-gradient(circle at 60% 20%, rgba(109, 40, 217, 0.15) 0%, rgba(17, 24, 39, 0) 50%)'
                  ]
                  : [
                    'radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.2) 0%, rgba(255, 255, 255, 0) 50%)',
                    'radial-gradient(circle at 80% 70%, rgba(124, 58, 237, 0.2) 0%, rgba(255, 255, 255, 0) 50%)',
                    'radial-gradient(circle at 40% 80%, rgba(37, 99, 235, 0.2) 0%, rgba(255, 255, 255, 0) 50%)',
                    'radial-gradient(circle at 60% 20%, rgba(124, 58, 237, 0.2) 0%, rgba(255, 255, 255, 0) 50%)'
                  ]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-500'} opacity-10`}
                  style={{
                    width: Math.random() * 10 + 5,
                    height: Math.random() * 10 + 5,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, Math.random() * 100 - 50],
                    x: [0, Math.random() * 100 - 50],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="container mx-auto px-4 py-16 md:py-24 z-10">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto text-center"
              >
                <motion.h1
                  variants={fadeInUp}
                  className={`text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r ${darkMode ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'} text-transparent bg-clip-text transition-colors duration-500`}
                >
                  Hello, I'm <span className="block mt-2">Mahodi Hasan Sabab</span>
                </motion.h1>

                <motion.h2
                  variants={fadeInUp}
                  className={`text-2xl md:text-3xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 transition-colors duration-500`}
                >
                  Software Engineer | Full Stack Developer | Crossplatform Mobile Application Developer
                </motion.h2>

                <motion.p
                  variants={fadeInUp}
                  className={`text-lg md:text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-12 leading-loose transition-colors duration-500`}
                >
                  As a highly motivated and detail-oriented developer, I specialize in creating elegant,
                  user-friendly web and crossplatform mobile applications with modern technologies. With expertise in <b>React,
                    Next.js, TypeScript, MongoDB, Firebase, Supabase and Flutter</b>. I'm passionate about delivering exceptional digital experiences
                  that meet both user needs and business goals.
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  className="flex justify-center space-x-4"
                >
                  <motion.a
                    href="https://github.com/mahodi-mr2107371"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'} text-white p-3 rounded-full transition-all duration-300`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaGithub className="text-xl" />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/mahodi-hasan-831704243"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaLinkedin className="text-xl" />
                  </motion.a>
                </motion.div>
              </motion.div>

              {showScrollIndicator && (
                <motion.div
                  className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <FaArrowDown className="text-2xl" />
                </motion.div>
              )}
            </div>
          </section>

          {/* Experience Section */}
          <section
            ref={experienceRef}
            className={`min-h-screen flex items-center ${darkMode ? 'bg-gray-800' : 'bg-blue-50'} py-16 transition-colors duration-500`}
          >
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.h2
                  className={`text-4xl md:text-5xl font-bold mb-16 text-center ${darkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Work Experience
                </motion.h2>
                <div className="max-w-4xl mx-auto">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 100
                      }}
                      viewport={{ once: true, margin: "-50px" }}
                      className={`mb-12 ${darkMode ? 'bg-gray-700' : 'bg-white'} p-8 rounded-lg shadow-lg transition-all duration-500`}
                      whileHover={{
                        y: -5,
                        boxShadow: darkMode
                          ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                          : "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                      }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}>
                          {exp.title}
                        </h3>
                        <p className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} font-medium transition-colors duration-500`}>
                          {exp.duration}
                        </p>
                      </div>
                      <h4 className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-colors duration-500`}>
                        {exp.company}
                      </h4>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed transition-colors duration-500`}>
                        {exp.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Education Section */}
          <section
            ref={educationRef}
            className={`min-h-screen flex items-center ${darkMode ? 'bg-gray-900' : 'bg-white'} py-16 transition-colors duration-500`}
          >
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.h2
                  className={`text-4xl md:text-5xl font-bold mb-16 text-center ${darkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Education
                </motion.h2>
                <div className="max-w-4xl mx-auto">
                  {education.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 100
                      }}
                      viewport={{ once: true, margin: "-50px" }}
                      className={`mb-12 ${darkMode ? 'bg-gray-800' : 'bg-blue-50'} p-8 rounded-lg shadow-lg transition-all duration-500`}
                      whileHover={{
                        y: -5,
                        boxShadow: darkMode
                          ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                          : "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                      }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}>
                          {edu.degree}
                        </h3>
                        <p className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} font-medium transition-colors duration-500`}>
                          {edu.duration}
                        </p>
                      </div>
                      <h4 className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-colors duration-500`}>
                        {edu.institution}
                      </h4>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed transition-colors duration-500`}>
                        {edu.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Skills Section */}
          <section
            ref={skillsRef}
            className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-blue-50'} transition-colors duration-500`}
          >
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.h2
                  className={`text-4xl md:text-5xl font-bold mb-16 text-center ${darkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Skills
                </motion.h2>
                <div className="max-w-4xl mx-auto">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="mb-8"
                    >
                      <div className="flex justify-between mb-2">
                        <span className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}>
                          {skill.name}
                        </span>
                        <span className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2.5 transition-colors duration-500`}>
                        <motion.div
                          className={`h-2.5 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} transition-colors duration-500`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{
                            duration: 1.5,
                            ease: "easeOut",
                            type: "spring",
                            stiffness: 50
                          }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Projects Section */}
          <section
            ref={projectsRef}
            className={`min-h-screen flex items-center ${darkMode ? 'bg-gray-900' : 'bg-white'} py-16 transition-colors duration-500`}
          >
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.h2
                  className={`text-4xl md:text-5xl font-bold mb-16 text-center ${darkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Projects
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                      viewport={{ once: true, margin: "-50px" }}
                      whileHover={{
                        y: -10,
                        scale: 1.02,
                        transition: { duration: 0.3 }
                      }}
                      className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg overflow-hidden shadow-lg transition-all duration-500 group`}
                    >
                      <div
                        className={`h-48 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center overflow-hidden transition-colors duration-500 relative`}
                      >
                        <div className={`text-${darkMode ? 'gray-400' : 'gray-500'} text-lg transition-colors duration-500`}>
                          <img src={project.image} />
                        </div>
                        <motion.div
                          className="absolute inset-0 bg-blue-600 bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white font-medium flex items-center"
                            >
                              View Project <FaExternalLinkAlt className="ml-2" />
                            </a>
                          )}
                        </motion.div>
                      </div>
                      <div className="p-6">
                        <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}>
                          {project.title}
                        </h3>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-colors duration-500`}>
                          {project.description}
                        </p>
                        <div className="mb-4 flex flex-wrap">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className={`inline-block ${darkMode
                                ? 'bg-blue-900 text-blue-300'
                                : 'bg-blue-100 text-blue-800'} 
                                                        text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded transition-colors duration-500`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        {project.link && (
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center ${darkMode
                              ? 'text-blue-400 hover:text-blue-300'
                              : 'text-blue-600 hover:text-blue-800'} font-medium transition-colors duration-300`}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View Project <FaExternalLinkAlt className="ml-2 text-sm" />
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Contact Section */}
          <footer
            ref={contactRef}
            className={`min-h-screen flex items-center ${darkMode ? 'bg-gray-800' : 'bg-gray-900'} text-white py-16 transition-colors duration-500`}
          >
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-6xl mx-auto"
              >
                <motion.h2
                  className="text-4xl md:text-5xl font-bold mb-16 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Get in Touch
                </motion.h2>
                <div className="flex flex-col lg:flex-row gap-16">
                  <motion.div
                    className="flex-1"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                    <div className="space-y-6">
                      <motion.div
                        className="flex items-center"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <FaEnvelope className="text-blue-400 text-xl mr-4" />
                        <p>mahodi.hsp@gmail.com</p>
                      </motion.div>
                      <motion.div
                        className="flex items-center"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <FaPhone className="text-blue-400 text-xl mr-4" />
                        <p>+974-55410056</p>
                      </motion.div>
                      <div className="mt-12">
                        <motion.button
                          onClick={handleDownloadCV}
                          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-all duration-300 flex items-center"
                          whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Download CV
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex-1"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
                    <form
                      className="space-y-6"
                      onSubmit={handleSendMessage}
                    >
                      <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="senderEmail">
                          Your Email
                        </label>
                        <motion.input
                          type="email"
                          id="senderEmail"
                          name="email"
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                          className={`w-full p-3 ${darkMode
                            ? 'bg-gray-700 border-gray-600 focus:border-blue-500'
                            : 'bg-gray-800 border-gray-700 focus:border-blue-400'} 
                                                border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                          required
                          whileFocus={{ scale: 1.01 }}
                          disabled={formStatus === 'submitting'}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="message">
                          Your Message
                        </label>
                        <motion.textarea
                          id="message"
                          name="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={6}
                          className={`w-full p-3 ${darkMode
                            ? 'bg-gray-700 border-gray-600 focus:border-blue-500'
                            : 'bg-gray-800 border-gray-700 focus:border-blue-400'} 
                                                border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                          required
                          whileFocus={{ scale: 1.01 }}
                          disabled={formStatus === 'submitting'}
                        />
                      </div>
                      <motion.button
                        type="submit"
                        className={`relative bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-all duration-300 ${formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
                        whileHover={{ scale: formStatus === 'submitting' ? 1 : 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                        whileTap={{ scale: formStatus === 'submitting' ? 1 : 0.95 }}
                        disabled={formStatus === 'submitting'}
                      >
                        {formStatus === 'submitting' ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </span>
                        ) : formStatus === 'success' ? (
                          <span className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Message Sent!
                          </span>
                        ) : (
                          'Send Message'
                        )}
                      </motion.button>

                      {formStatus === 'error' && (
                        <motion.p
                          className="text-red-400 mt-2"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          There was an error sending your message. Please try again.
                        </motion.p>
                      )}
                    </form>
                  </motion.div>
                </div>
                <motion.div
                  className="mt-24 text-center text-gray-400"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <p>&copy; {new Date().getFullYear()} Mahodi Hasan. All rights reserved.</p>
                </motion.div>
              </motion.div>
            </div>
          </footer>

        </div>
      </div>
    </>
  );
};

const PortfolioWithTheme = () => (
  <ThemeProvider>
    <PortfolioWebsite />
  </ThemeProvider>
);

export default PortfolioWithTheme;