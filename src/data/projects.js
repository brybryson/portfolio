export const projects = [
    {
        id: "portfolio",
        title: "Personal Portfolio",
        year: "2026",
        description: "Modern digital showcase built with React and Tailwind CSS, featuring high-fidelity glassmorphism.",
        image: "images/portfolio/updated-portfolio.png",
        tags: ["React JS", "Tailwind CSS"],
        category: "Web Design",
        quote: "A high-performance digital showcase.",
        slideshow: ["images/portfolio/updated-portfolio.png"],
        challenge: "This portfolio focuses on a high-fidelity 'Glassmorphism' aesthetic with bento-grid layouts, prioritizing content scannability and performant animations that delight the user.",
        solution: "Built with React and Tailwind CSS, featuring optimized asset loading, hardware-accelerated transitions, and a mobile-first approach for seamless cross-device compatibility.",
        features: [
            { name: "React JS", icon: "code" },
            { name: "Tailwind CSS", icon: "css" },
            { name: "Vite Build", icon: "speed" }
        ],
        icon: "palette"
    },
    {
        id: "custodian",
        title: "Property Custodian",
        year: "2026",
        description: "Resource management system with predictive algorithms for institutional asset tracking.",
        image: "images/custodian/Screenshot 2026-02-06 at 8.34.47 PM.png",
        tags: ["Power Platform", "PHP"],
        category: "Asset Management",
        quote: "Smart resource tracking with predictive logistics.",
        slideshow: [
            "images/custodian/Screenshot 2026-02-06 at 8.34.47 PM.png",
            "images/custodian/Screenshot 2026-02-06 at 8.34.59 PM.png",
            "images/custodian/Screenshot 2026-02-06 at 8.35.18 PM.png",
            "images/custodian/Screenshot 2026-02-06 at 8.35.36 PM.png",
            "images/custodian/Screenshot 2026-02-06 at 8.35.48 PM.png",
            "images/custodian/Screenshot 2026-02-06 at 8.36.00 PM.png",
            "images/custodian/Screenshot 2026-02-06 at 8.37.11 PM.png",
            "images/custodian/Screenshot 2026-02-06 at 8.37.23 PM.png",
            "images/custodian/Screenshot 2026-02-06 at 8.37.36 PM.png",
            "images/custodian/Screenshot 2026-02-06 at 8.37.52 PM.png",
            "images/custodian/Screenshot 2026-02-06 at 8.38.07 PM.png",
            "images/custodian/Screenshot 2026-02-06 at 8.38.29 PM.png",
            "images/custodian/Screenshot 2026-02-06 at 8.38.37 PM.png",
            "images/custodian/Screenshot 2026-02-06 at 8.38.46 PM.png",
            "images/custodian/Screenshot 2026-02-06 at 8.38.57 PM.png"
        ],
        challenge: "Institutions struggle with manual asset tracking and equipment lifecycle management, leading to significant resource loss and inventory discrepancies.",
        solution: "A specialized system using predictive algorithms to track asset health, automate procurement schedules, and generate real-time inventory audits with high accuracy.",
        features: [
            { name: "Real-time", icon: "monitoring" },
            { name: "AI Audits", icon: "inventory_2" },
            { name: "Lifecycle", icon: "history" },
            { name: "Secure", icon: "security" }
        ],
        demoUrl: "https://properties.bcps4core.com/login/index.php",
        icon: "monitoring"
    },
    {
        id: "prefect",
        title: "Prefect System",
        year: "2026",
        description: "Rule-based decision support system for managing student infractions and sanctions.",
        image: "images/prefect/Screenshot 2026-02-06 at 8.25.21 PM.png",
        tags: ["Rule-Based AI", "PHP/MySQL"],
        category: "Student Conduct",
        quote: "Intelligent disciplinary action and guidance management.",
        slideshow: [
            "images/prefect/Screenshot 2026-02-06 at 8.24.32 PM.png",
            "images/prefect/Screenshot 2026-02-06 at 8.25.21 PM.png",
            "images/prefect/Screenshot 2026-02-06 at 8.27.01 PM.png",
            "images/prefect/Screenshot 2026-02-06 at 8.27.18 PM.png",
            "images/prefect/Screenshot 2026-02-06 at 8.27.52 PM.png",
            "images/prefect/Screenshot 2026-02-06 at 8.28.02 PM.png",
            "images/prefect/Screenshot 2026-02-06 at 8.28.28 PM.png",
            "images/prefect/Screenshot 2026-02-06 at 8.29.09 PM.png",
            "images/prefect/Screenshot 2026-02-06 at 8.29.23 PM.png",
            "images/prefect/Screenshot 2026-02-06 at 8.29.43 PM.png",
            "images/prefect/Screenshot 2026-02-06 at 8.30.37 PM.png",
            "images/prefect/Screenshot 2026-02-06 at 8.30.52 PM.png",
            "images/prefect/Screenshot 2026-02-06 at 8.31.10 PM.png",
            "images/prefect/Screenshot 2026-02-06 at 8.32.04 PM.png"
        ],
        challenge: "To centralize student behavior records, enabling school administrators to manage sanctions fairly and transparently while providing counselors with actionable insights for student guidance.",
        solution: "Integrated a rule-based AI heuristic to recommend appropriate corrective measures based on the severity and frequency of infractions, ensuring consistency across all disciplinary cases.",
        features: [
            { name: "Behavior Scoring", icon: "analytics" },
            { name: "AI Recommendations", icon: "psychology" },
            { name: "Auto Certs", icon: "verified" },
            { name: "Guidance Sync", icon: "groups" }
        ],
        demoUrl: "http://localhost/property-custodian/login/index.php",
        icon: "analytics"
    },
    {
        id: "safetyheroes",
        title: "Safety Heroes",
        year: "2025",
        description: "AI-driven disaster preparedness platform for children built during a hackathon.",
        image: "images/SafetyHeroes.png",
        tags: ["AI Learning", "UI Design"],
        category: "Hackathon Project",
        quote: "Empowering the next generation with disaster preparedness skills.",
        slideshow: ["images/SafetyHeroes.png"],
        longDescription: "Safety Heroes is a disaster preparedness learning app for children, built during the Caffeine.AI Manila Hackathon. It focuses on creating an engaging, child-friendly interface that teaches emergency response through interactive scenarios.",
        demoUrl: "https://safetyheroes-rb1.caffeine.xyz/",
        features: [
            { name: "Educational", icon: "school", desc: "Gamified learning for children." },
            { name: "AI-Driven", icon: "psychology", desc: "Smart scenario generation." },
            { name: "Technical Theme", icon: "shield", desc: "Caffeine.AI Hackathon Participant." }
        ],
        icon: "school"
    },
    {
        id: "petgrooming",
        title: "PetSense",
        year: "2025",
        description: "Web-Based RFID Pet Grooming Management System with automated tracking.",
        image: "animates/1 - title.png",
        tags: ["RFID", "IoT"],
        category: "Web & IoT",
        quote: "Intelligent RFID pet grooming and operation Management.",
        slideshow: [
            "animates/1 - title.png",
            "animates/2 - next.png",
            "animates/3 - process.png",
            "animates/4 - next.png",
            "animates/5 - next.png",
            "animates/6 - next.png",
            "animates/7 - next.png",
            "animates/8 - next.png"
        ],
        challenge: "To digitize the pet grooming experience at Animates through RFID integration, automating pet identification and tracking service history for improved customer loyalty and operation efficiency.",
        solution: "Implemented a seamless RFID checking system that instantly retrieves a pet's medical and grooming history, allowing groomers to provide personalized care based on historical data.",
        features: [
            { name: "RFID Tracking", icon: "nfc" },
            { name: "Service CRM", icon: "contact_page" },
            { name: "Real-time Data", icon: "database" }
        ],
        demoUrl: "https://animates.infinityfree.me/animates/html/auth.html",
        icon: "nfc"
    },
    {
        id: "alertpoint",
        title: "AlertPoint",
        year: "2025",
        description: "Disaster Risk Reduction Management System with integrated hardware monitoring.",
        image: "alertpoint/1 - alertpoint.png",
        tags: ["Full-Stack", "IoT"],
        category: "Disaster Management",
        quote: "Real-time hazard monitoring and early warning system.",
        slideshow: [
            "alertpoint/1 - alertpoint.png",
            "alertpoint/1 - hardware.png",
            "alertpoint/1 - hardwaree.png",
            "alertpoint/2 - alert.png",
            "alertpoint/3 - environmental.png",
            "alertpoint/4 - environ.png",
            "alertpoint/5 - environ.png",
            "alertpoint/6 - water.png",
            "alertpoint/7 - water.png",
            "alertpoint/8 - water.png",
            "alertpoint/9 - barangay.png",
            "alertpoint/10 -barangay.png",
            "alertpoint/11 - maps.png",
            "alertpoint/12- maps.png",
            "alertpoint/13 - maps.png",
            "alertpoint/14 - logs.png",
            "alertpoint/15 - admin logs.png",
            "alertpoint/16 - system logs.png"
        ],
        challenge: "Disaster-prone communities often lack localized, real-time warning systems, relying on delayed national broadcasts that may not reflect immediate local conditions.",
        solution: "AlertPoint uses localized IoT sensors for floods and fires, delivering instant alerts via a centralized web dashboard and public notification system to reduce response times.",
        features: [
            { name: "IoT Sensors", icon: "sensor_occupied" },
            { name: "Early Warning", icon: "notification_important" },
            { name: "Map Visuals", icon: "map" },
            { name: "Incident Logs", icon: "history" }
        ],
        icon: "sensor_occupied"
    },
    {
        id: "vetflow",
        title: "VetFlow",
        year: "2024",
        description: "Point-of-Sale and Inventory Management System for animal clinics.",
        image: "vetflow/1-vetflow_1.PNG",
        tags: ["PHP", "MySQL"],
        category: "Clinic Management",
        quote: "Seamless pet care and inventory workflow.",
        slideshow: [
            "vetflow/1-vetflow_1.PNG",
            "vetflow/Add New Products.PNG",
            "vetflow/Add New Services.PNG",
            "vetflow/Data Management (1).PNG",
            "vetflow/Item Preview.PNG",
            "vetflow/Item Stockks.PNG",
            "vetflow/Item Stocks.PNG",
            "vetflow/Ordered Items.PNG",
            "vetflow/POS Terminal (Services).PNG",
            "vetflow/Print Invoice.PNG",
            "vetflow/Reports.PNG",
            "vetflow/Sales History.PNG",
            "vetflow/Supplier.PNG",
            "vetflow/User Management.PNG"
        ],
        challenge: "Providing a robust POS and Inventory system for veterinary clinics to handle high-volume patient traffic without missing critical medical records or stock updates.",
        solution: "Automated medical certificate generation and patient history tracking that syncs directly with the inventory system for used medication and supplies.",
        features: [
            { name: "Patient Records", icon: "pets" },
            { name: "Billing System", icon: "receipt_long" },
            { name: "Stock Manager", icon: "inventory" },
            { name: "Sales Data", icon: "bar_chart" }
        ],
        icon: "pets"
    },
    {
        id: "salbag",
        title: "SALBAG",
        year: "2024",
        description: "Smart Anti-Theft Device with IoT, Face Detection & GPS Tracking.",
        image: "images/salbag_3d representation.png",
        tags: ["Raspberry Pi", "AI/ML"],
        category: "Smart Security",
        quote: "Intelligent Anti-Theft Device for urban security.",
        slideshow: ["images/salbag_3d representation.png"],
        hardwareStack: [
            { name: "Raspberry Pi 4B (Core Engine)", icon: "memory" },
            { name: "CMOS Camera (Face Detection)", icon: "photo_camera" },
            { name: "GPS NEO8MV2 (Live Tracking)", icon: "explore" }
        ],
        softwareStack: [
            { name: "Python / OpenCV (Vision AI)", icon: "code" },
            { name: "Flutter (Mobile App Control)", icon: "smartphone" },
            { name: "SMTP (Alert Notifications)", icon: "mail" }
        ],
        features: [
            { name: "GPS Tracking", icon: "gps_fixed" },
            { name: "Face ID", icon: "face" },
            { name: "Panic Alarm", icon: "emergency_home" },
            { name: "Sync Cloud", icon: "cloud_sync" }
        ],
        documentation: {
            overview: "Development of a Smart Anti-Theft Device (SALBAG) addressing crime in the Philippines. Enhances security through real-time GPS tracking, face detection, and panic alarm managed via mobile app. Uses Raspberry Pi 4B and OpenCV for live evidence collection.",
            problem: "Rising theft and kidnapping incidents in the Philippines, with many crimes go unresolved due to lack of surveillance and poor evidence collection.",
            objectives: [
                { id: "01", text: "Develop IoT bag with GPS and image detection." },
                { id: "02", text: "Create mobile app for real-time tracking." },
                { id: "03", text: "Provide clear evidence for investigation." }
            ],
            components: [
                { name: "GPS Tracking", icon: "gps_fixed" },
                { name: "Face ID", icon: "face" },
                { name: "Panic Alarm", icon: "emergency_home" },
                { name: "Sync Cloud", icon: "cloud_sync" }
            ]
        },
        icon: "gps_fixed"
    },
    {
        id: "confession",
        title: "Confession Wall",
        year: "2024",
        description: "Community wall for anonymous confessions built for Google Developer Student Clubs.",
        image: "images/confession_wall_gdsc.png",
        tags: ["JavaScript", "Firebase"],
        category: "Community",
        quote: "A community-driven digital space for anonymous expression.",
        slideshow: ["images/confession_wall_gdsc.png"],
        challenge: "Built for the Google Developer Student Clubs, this platform provides students a safe, anonymous outlet to share messages, fostering community engagement through digital expression.",
        solution: "Leverages Firebase for semi-real-time data synchronization, ensuring that new 'confessions' appear almost instantly across all active client sessions without manual refreshes.",
        features: [
            { name: "JavaScript", icon: "javascript" },
            { name: "Firebase", icon: "database" },
            { name: "Vite", icon: "bolt" }
        ],
        demoUrl: "https://confession-wall-ctso-gdscnufv.vercel.app/",
        icon: "forum"
    },
    {
        id: "xoxo",
        title: "XOXO TicTacToe",
        year: "2024",
        description: "Multiplayer and AI-powered game with leaderboard and scoring system.",
        image: "tictactoe/1 -XOXO-landing.png",
        tags: ["PHP", "MySQL"],
        category: "Game Dev",
        quote: "Neon-arcade multiplayer strategy game.",
        slideshow: [
            "tictactoe/1 -XOXO-landing.png",
            "tictactoe/2.png",
            "tictactoe/3.png",
            "tictactoe/4.png",
            "tictactoe/5.png",
            "tictactoe/6.png"
        ],
        challenge: "XOXO breathes new life into Tic-Tac-Toe with local multiplayer, AI challenge modes, and a global leaderboard to track the world's best strategists.",
        solution: "Designed with a retro-neon arcade theme, utilizing CSS transitions and AJAX for fluid, state-driven gameplay without page reloads.",
        features: [
            { name: "PHP / MySQL", icon: "php" },
            { name: "AJAX Sync", icon: "sync" },
            { name: "Neon UI", icon: "palette" }
        ],
        demoUrl: "https://xoxo.infinityfree.me/XOXO/XOXO/index.php",
        icon: "sports_esports"
    },
    {
        id: "arduino",
        title: "Distancing Belt",
        year: "2022",
        description: "Arduino-based wearable device featuring PIR and ultrasonic sensors for safe distancing.",
        image: "images/arduino_belt_1.png",
        tags: ["Arduino", "Sensors"],
        category: "Wearable Tech",
        quote: "Arduino-based safety device for proximity monitoring.",
        slideshow: ["images/arduino_belt_1.png"],
        challenge: "Developed during the pandemic peak, this wearable device uses ultrasonic waves and PIR sensors to detect human presence within a 2-meter radius, providing immediate haptic alerts.",
        solution: "Features a dual-alert system: a discreet vibration motor for the wearer and a gentle acoustic buzzer to notify others, ensuring safety in crowded environments.",
        features: [
            { name: "Arduino Uno", icon: "memory" },
            { name: "Ultrasonic SR04", icon: "sensors" },
            { name: "PIR Sensor", icon: "motion_sensor" }
        ],
        documentation: {
            overview: "The \"Distance Watchdog\" is a smart belt designed to enforce social distancing. It utilizes an Arduino microcontroller and various sensors to monitor the user's surroundings and provide real-time alerts.",
            components: [
                { name: "Arduino Uno R3", icon: "memory" },
                { name: "HC-SR04 Ultrasonic", icon: "sensors" },
                { name: "PIR Motion Sensor", icon: "sensors" },
                { name: "Piezo Buzzer", icon: "volume_up" }
            ]
        },
        icon: "waist"
    }
];
