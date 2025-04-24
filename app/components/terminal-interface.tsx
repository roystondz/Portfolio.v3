"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronRight, X, Maximize2, Minimize2 } from "lucide-react"

interface Command {
  command: string
  output: string | JSX.Element
  timestamp: Date
}

export default function TerminalInterface({ theme }: { theme: string }) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Command[]>([
    {
      command: "welcome",
      output: (
        <div>
          <p className="text-green-400 font-bold">Welcome to Roys's Terminal!</p>
          <p className="mt-2">
            Type <span className="text-yellow-400">help</span> to see available commands.
          </p>
        </div>
      ),
      timestamp: new Date(),
    },
  ])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Focus input when terminal is clicked
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }

    const terminal = terminalRef.current
    if (terminal) {
      terminal.addEventListener("click", handleClick)
    }

    return () => {
      if (terminal) {
        terminal.removeEventListener("click", handleClick)
      }
    }
  }, [])

  // Available commands
  const commands = {
    help: () => (
      <div className="space-y-1">
        <p className="text-green-400 font-bold">Available commands:</p>
        <p>
          <span className="text-yellow-400">about</span> - Learn about me
        </p>
        <p>
          <span className="text-yellow-400">skills</span> - View my technical skills
        </p>
        <p>
          <span className="text-yellow-400">projects</span> - See my projects
        </p>
        <p>
          <span className="text-yellow-400">contact</span> - Get my contact information
        </p>
        <p>
          <span className="text-yellow-400">clear</span> - Clear the terminal
        </p>
        <p>
          <span className="text-yellow-400">html</span> - Show HTML code sample
        </p>
        <p>
          <span className="text-yellow-400">css</span> - Show CSS code sample
        </p>
        <p>
          <span className="text-yellow-400">javascript</span> - Show JavaScript code sample
        </p>
        <p>
          <span className="text-yellow-400">react</span> - Show React code sample
        </p>
        <p>
          <span className="text-yellow-400">python</span> - Show Python code sample
        </p>
        <p>
          <span className="text-yellow-400">c</span> - Show C code sample
        </p>
        <p>
          <span className="text-yellow-400">date</span> - Display current date and time
        </p>
        <p>
          <span className="text-yellow-400">echo [text]</span> - Echo back the provided text
        </p>
      </div>
    ),
    about: () => (
      <div>
        <p className="text-green-400 font-bold">About Royston Akash Dsouza:</p>
        <p className="mt-1">
          I'm a Computer Engineering student passionate about building innovative solutions that bridge hardware and
          software. With a strong foundation in both electrical engineering principles and software development, I
          create systems that solve real-world problems.
        </p>
      </div>
    ),
    skills: () => (
      <div>
        <p className="text-green-400 font-bold">Technical Skills:</p>
        <ul className="list-disc pl-5 mt-1">
          <li>Frontend: HTML, CSS, JavaScript, React, Next.js</li>
          <li>Backend: Node.js, Express, Python, Django</li>
          <li>Database: SQL, MongoDB, Firebase</li>
          <li>Hardware: Arduino, Raspberry Pi, Circuit Design</li>
          <li>Languages: JavaScript, Python, C/C++, Java</li>
          <li>Tools: Git, Docker, AWS, Linux</li>
        </ul>
      </div>
    ),
    projects: () => (
      <div>
        <p className="text-green-400 font-bold">Projects:</p>
        <div className="mt-1 space-y-2">
          <div>
            <p className="text-yellow-400">Smart Home System</p>
            <p className="pl-2">
              Designed and implemented an IoT-based smart home system using Arduino and Raspberry Pi.
            </p>
          </div>
          <div>
            <p className="text-yellow-400">Machine Learning Classifier</p>
            <p className="pl-2">
              Developed a machine learning model to classify images of circuit boards for defect detection.
            </p>
          </div>
          <div>
            <p className="text-yellow-400">Personal Portfolio</p>
            <p className="pl-2">Created this responsive portfolio website with 3D elements and animations.</p>
          </div>
          <div>
            <p className="text-yellow-400">Inventory Management System</p>
            <p className="pl-2">Built a full-stack inventory management system for a local electronics store.</p>
          </div>
        </div>
      </div>
    ),
    contact: () => (
      <div>
        <p className="text-green-400 font-bold">Contact Information:</p>
        <p className="mt-1">Email: roystonad2004@example.com</p>
        <p>GitHub: github.com/roystondz</p>
        <p>LinkedIn: linkedin.com/in/royston-akash-dsouza</p>
        <p>Location: Mangalore, Karnataka</p>
      </div>
    ),
    html: () => (
      <div>
        <p className="text-green-400 font-bold">HTML Code Sample:</p>
        <pre className="bg-gray-900 p-2 rounded mt-1 overflow-x-auto">
          <code className="text-sm">
            {`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Layout</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <div class="logo">Brand</div>
      <ul class="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <section id="hero">
      <h1>Welcome to my website</h1>
      <p>This is a responsive layout example</p>
      <button>Learn More</button>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2023 My Website. All rights reserved.</p>
  </footer>
</body>
</html>`}
          </code>
        </pre>
      </div>
    ),
    css: () => (
      <div>
        <p className="text-green-400 font-bold">CSS Code Sample:</p>
        <pre className="bg-gray-900 p-2 rounded mt-1 overflow-x-auto">
          <code className="text-sm">
            {`/* Modern CSS with variables and responsive design */
:root {
  --primary-color: #4a6cf7;
  --secondary-color: #f9f9f9;
  --text-color: #333;
  --spacing-unit: 8px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: var(--text-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 calc(var(--spacing-unit) * 2);
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: calc(var(--spacing-unit) * 3);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

/* Responsive grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: calc(var(--spacing-unit) * 3);
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}`}
          </code>
        </pre>
      </div>
    ),
    javascript: () => (
      <div>
        <p className="text-green-400 font-bold">JavaScript Code Sample:</p>
        <pre className="bg-gray-900 p-2 rounded mt-1 overflow-x-auto">
          <code className="text-sm">
            {`// Modern JavaScript with async/await and ES6+ features
class DataService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.cache = new Map();
  }

  async fetchData(endpoint, params = {}) {
    const url = new URL(\`\${this.apiUrl}/\${endpoint}\`);
    
    // Add query parameters
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    
    // Check cache first
    const cacheKey = url.toString();
    if (this.cache.has(cacheKey)) {
      console.log('Returning cached data');
      return this.cache.get(cacheKey);
    }
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! Status: \${response.status}\`);
      }
      
      const data = await response.json();
      
      // Cache the result
      this.cache.set(cacheKey, data);
      
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  
  clearCache() {
    this.cache.clear();
    console.log('Cache cleared');
  }
}

// Usage example
const apiService = new DataService('https://api.example.com');

async function getUserData(userId) {
  try {
    const userData = await apiService.fetchData('users', { id: userId });
    return userData;
  } catch (error) {
    console.error('Failed to get user data:', error);
    return null;
  }
}

// Event listener with debounce
function debounce(func, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

const handleSearch = debounce((event) => {
  const searchTerm = event.target.value;
  console.log('Searching for:', searchTerm);
  // Perform search operation
});

document.querySelector('#search').addEventListener('input', handleSearch);`}
          </code>
        </pre>
      </div>
    ),
    react: () => (
      <div>
        <p className="text-green-400 font-bold">React Code Sample:</p>
        <pre className="bg-gray-900 p-2 rounded mt-1 overflow-x-auto">
          <code className="text-sm">
            {`import { useState, useEffect, useCallback } from 'react';

// Custom hook for fetching data
function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! Status: \${response.status}\`);
      }
      
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Main component
function DataDashboard({ userId }) {
  const { data, loading, error, refetch } = useFetch(
    \`https://api.example.com/users/\${userId}\`
  );
  
  const [activeTab, setActiveTab] = useState('profile');
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  
  return (
    <div className="dashboard">
      <header>
        <h1>Welcome, {data?.name}</h1>
        <p>Last login: {new Date(data?.lastLogin).toLocaleString()}</p>
      </header>
      
      <TabNavigation 
        tabs={['profile', 'settings', 'activity']}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      
      <main>
        {activeTab === 'profile' && (
          <ProfileSection userData={data} />
        )}
        {activeTab === 'settings' && (
          <SettingsSection userData={data} />
        )}
        {activeTab === 'activity' && (
          <ActivitySection userId={userId} />
        )}
      </main>
    </div>
  );
}

// Helper components
const LoadingSpinner = () => (
  <div className="loading-spinner">Loading...</div>
);

const ErrorMessage = ({ message, onRetry }) => (
  <div className="error-message">
    <p>Error: {message}</p>
    <button onClick={onRetry}>Retry</button>
  </div>
);

export default DataDashboard;`}
          </code>
        </pre>
      </div>
    ),
    python: () => (
      <div>
        <p className="text-green-400 font-bold">Python Code Sample:</p>
        <pre className="bg-gray-900 p-2 rounded mt-1 overflow-x-auto">
          <code className="text-sm">
            {`import os
import json
import logging
from typing import Dict, List, Optional, Union
from dataclasses import dataclass
from datetime import datetime, timedelta

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

@dataclass
class SensorReading:
    """Data class for sensor readings."""
    sensor_id: str
    temperature: float
    humidity: Optional[float]
    pressure: Optional[float]
    timestamp: datetime
    
    @classmethod
    def from_dict(cls, data: Dict) -> 'SensorReading':
        """Create a SensorReading from a dictionary."""
        return cls(
            sensor_id=data['sensor_id'],
            temperature=data['temperature'],
            humidity=data.get('humidity'),
            pressure=data.get('pressure'),
            timestamp=datetime.fromisoformat(data['timestamp'])
        )
    
    def to_dict(self) -> Dict:
        """Convert to dictionary for serialization."""
        return {
            'sensor_id': self.sensor_id,
            'temperature': self.temperature,
            'humidity': self.humidity,
            'pressure': self.pressure,
            'timestamp': self.timestamp.isoformat()
        }

class SensorDataProcessor:
    """Process and analyze sensor data."""
    
    def __init__(self, data_dir: str):
        self.data_dir = data_dir
        self.readings: List[SensorReading] = []
        
    def load_data(self, days: int = 7) -> None:
        """Load sensor data from the past specified days."""
        logger.info(f"Loading sensor data from the past {days} days")
        
        cutoff_date = datetime.now() - timedelta(days=days)
        files_loaded = 0
        
        for filename in os.listdir(self.data_dir):
            if not filename.endswith('.json'):
                continue
                
            file_path = os.path.join(self.data_dir, filename)
            try:
                with open(file_path, 'r') as f:
                    data = json.load(f)
                    
                for reading_data in data:
                    reading = SensorReading.from_dict(reading_data)
                    if reading.timestamp >= cutoff_date:
                        self.readings.append(reading)
                
                files_loaded += 1
            except (json.JSONDecodeError, KeyError) as e:
                logger.error(f"Error processing {filename}: {e}")
        
        logger.info(f"Loaded {len(self.readings)} readings from {files_loaded} files")
    
    def get_average_temperature(self, sensor_id: Optional[str] = None) -> float:
        """Calculate average temperature, optionally filtered by sensor ID."""
        filtered_readings = [r for r in self.readings if sensor_id is None or r.sensor_id == sensor_id]
        
        if not filtered_readings:
            logger.warning(f"No readings found for sensor {sensor_id}")
            return 0.0
            
        total = sum(r.temperature for r in filtered_readings)
        return total / len(filtered_readings)
    
    def get_temperature_range(self) -> Dict[str, Union[float, None]]:
        """Get the min and max temperatures across all sensors."""
        if not self.readings:
            return {'min': None, 'max': None}
            
        temperatures = [r.temperature for r in self.readings]
        return {
            'min': min(temperatures),
            'max': max(temperatures)
        }
    
    def analyze_data(self) -> Dict:
        """Perform analysis on the sensor data."""
        result = {
            'total_readings': len(self.readings),
            'unique_sensors': len(set(r.sensor_id for r in self.readings)),
            'avg_temperature': self.get_average_temperature(),
            'temperature_range': self.get_temperature_range(),
            'readings_by_sensor': {}
        }
        
        # Group readings by sensor
        sensor_ids = set(r.sensor_id for r in self.readings)
        for sensor_id in sensor_ids:
            sensor_readings = [r for r in self.readings if r.sensor_id == sensor_id]
            result['readings_by_sensor'][sensor_id] = {
                'count': len(sensor_readings),
                'avg_temperature': sum(r.temperature for r in sensor_readings) / len(sensor_readings)
            }
        
        return result

# Example usage
if __name__ == "__main__":
    processor = SensorDataProcessor("./sensor_data")
    processor.load_data(days=30)
    analysis = processor.analyze_data()
    
    print(f"Analyzed {analysis['total_readings']} readings from {analysis['unique_sensors']} sensors")
    print(f"Average temperature: {analysis['avg_temperature']:.2f}°C")
    print(f"Temperature range: {analysis['temperature_range']['min']:.2f}°C to {analysis['temperature_range']['max']:.2f}°C")
    
    # Export results
    with open("analysis_results.json", "w") as f:
        json.dump(analysis, f, indent=2)`}
          </code>
        </pre>
      </div>
    ),
    c: () => (
      <div>
        <p className="text-green-400 font-bold">C Code Sample (Embedded Systems):</p>
        <pre className="bg-gray-900 p-2 rounded mt-1 overflow-x-auto">
          <code className="text-sm">
            {`#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>
#include <string.h>

// Hardware register definitions
#define GPIO_BASE       0x40020000
#define GPIO_PORT_A     (GPIO_BASE + 0x0000)
#define GPIO_PORT_B     (GPIO_BASE + 0x0400)
#define GPIO_MODE_REG   0x00
#define GPIO_OUTPUT_REG 0x14
#define GPIO_INPUT_REG  0x10

// Pin definitions
#define LED_PIN         5
#define BUTTON_PIN      3
#define SENSOR_PIN      7

// ADC definitions
#define ADC_BASE        0x40012000
#define ADC_CR1         0x04
#define ADC_CR2         0x08
#define ADC_SQR1        0x2C
#define ADC_SQR3        0x34
#define ADC_DR          0x4C

// Timer definitions
#define TIMER_BASE      0x40000000
#define TIMER_CR1       0x00
#define TIMER_PSC       0x28
#define TIMER_ARR       0x2C
#define TIMER_CNT       0x24

// Function prototypes
void system_init(void);
void gpio_init(void);
void adc_init(void);
void timer_init(uint32_t period_ms);
uint16_t read_adc_value(uint8_t channel);
void set_led(bool state);
bool read_button(void);
void delay_ms(uint32_t ms);

// Volatile for memory-mapped registers
volatile uint32_t* const gpio_a = (uint32_t*)GPIO_PORT_A;
volatile uint32_t* const gpio_b = (uint32_t*)GPIO_PORT_B;
volatile uint32_t* const adc = (uint32_t*)ADC_BASE;
volatile uint32_t* const timer = (uint32_t*)TIMER_BASE;

// Global variables
typedef struct {
    uint16_t temperature;
    uint16_t humidity;
    uint16_t light_level;
    bool motion_detected;
} sensor_data_t;

sensor_data_t current_readings = {0};
bool alarm_active = false;
uint32_t last_reading_time = 0;
const uint32_t READING_INTERVAL_MS = 1000;

int main(void) {
    // Initialize system components
    system_init();
    gpio_init();
    adc_init();
    timer_init(1);  // 1ms timer resolution
    
    printf("System initialized. Starting main loop...\n");
    
    while (1) {
        // Get current time
        uint32_t current_time = timer[TIMER_CNT/4];
        
        // Read button input
        if (read_button()) {
            alarm_active = !alarm_active;
            printf("Alarm %s\n", alarm_active ? "activated" : "deactivated");
            delay_ms(200);  // Debounce
        }
        
        // Read sensor data at regular intervals
        if (current_time - last_reading_time >= READING_INTERVAL_MS) {
            // Read analog sensors
            current_readings.temperature = read_adc_value(0);
            current_readings.humidity = read_adc_value(1);
            current_readings.light_level = read_adc_value(2);
            
            // Read digital sensor
            current_readings.motion_detected = (gpio_b[GPIO_INPUT_REG/4] & (1 << SENSOR_PIN)) != 0;
            
            // Process readings
            process_sensor_data(&current_readings);
            
            // Update timestamp
            last_reading_time = current_time;
        }
        
        // Control LED based on alarm state
        if (alarm_active) {
            // Blink LED when alarm is active
            set_led((current_time % 500) < 250);
        } else {
            // LED on when motion is detected
            set_led(current_readings.motion_detected);
        }
    }
    
    return 0;  // Never reached
}

void system_init(void) {
    // Configure system clock and peripherals
    // ... (implementation details)
}

void gpio_init(void) {
    // Configure LED pin as output
    gpio_a[GPIO_MODE_REG/4] &= ~(0x3 << (LED_PIN * 2));
    gpio_a[GPIO_MODE_REG/4] |= (0x1 << (LED_PIN * 2));  // Output mode
    
    // Configure button pin as input with pull-up
    gpio_b[GPIO_MODE_REG/4] &= ~(0x3 << (BUTTON_PIN * 2));
    gpio_b[GPIO_MODE_REG/4] |= (0x2 << (BUTTON_PIN * 2));  // Input mode
    
    // Configure sensor pin as input
    gpio_b[GPIO_MODE_REG/4] &= ~(0x3 << (SENSOR_PIN * 2));
}

void adc_init(void) {
    // Configure ADC for temperature, humidity, and light sensors
    adc[ADC_CR1/4] = 0x00000100;  // 12-bit resolution
    adc[ADC_CR2/4] = 0x00000001;  // Enable ADC
}

void timer_init(uint32_t period_ms) {
    // Configure timer for specified period
    timer[TIMER_PSC/4] = 72 - 1;        // 72MHz / 72 = 1MHz
    timer[TIMER_ARR/4] = period_ms * 1000 - 1;  // 1MHz / 1000 = 1kHz (1ms)
    timer[TIMER_CR1/4] = 0x0001;        // Enable timer
}

uint16_t read_adc_value(uint8_t channel) {
    // Configure ADC channel
    adc[ADC_SQR3/4] = channel & 0x1F;
    
    // Start conversion
    adc[ADC_CR2/4] |= 0x00000001;
    
    // Wait for conversion to complete
    while (!(adc[ADC_SR/4] & 0x2)) {}
    
    // Read and return result
    return (uint16_t)(adc[ADC_DR/4] & 0xFFF);
}

void set_led(bool state) {
    if (state) {
        gpio_a[GPIO_OUTPUT_REG/4] |= (1 << LED_PIN);
    } else {
        gpio_a[GPIO_OUTPUT_REG/4] &= ~(1 << LED_PIN);
    }
}

bool read_button(void) {
    // Button is active low with pull-up
    return (gpio_b[GPIO_INPUT_REG/4] & (1 << BUTTON_PIN)) == 0;
}

void delay_ms(uint32_t ms) {
    uint32_t start = timer[TIMER_CNT/4];
    while ((timer[TIMER_CNT/4] - start) < ms) {
        // Wait
    }
}

void process_sensor_data(sensor_data_t* data) {
    // Convert ADC values to actual measurements
    float temp_celsius = (data->temperature * 3.3 / 4096) * 100.0;
    float humidity_percent = (data->humidity * 3.3 / 4096) * 100.0;
    float light_percent = (data->light_level * 100.0 / 4096);
    
    printf("Temp: %.1f°C, Humidity: %.1f%%, Light: %.1f%%, Motion: %s\n",
           temp_celsius, humidity_percent, light_percent,
           data->motion_detected ? "Detected" : "None");
           
    // Check for alarm conditions
    if (temp_celsius > 30.0 || humidity_percent > 80.0) {
        printf("WARNING: Environmental conditions outside normal range!\n");
    }
}`}
          </code>
        </pre>
      </div>
    ),
    date: () => (
      <div>
        <p>Current date and time: {new Date().toLocaleString()}</p>
      </div>
    ),
    clear: () => {
      setHistory([])
      return null
    },
    echo: (args) => {
      return <p>{args.join(" ")}</p>
    },
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add command to history
    const commandParts = input.trim().split(" ")
    const command = commandParts[0].toLowerCase()
    const args = commandParts.slice(1)

    // Add to command history for up/down navigation
    setCommandHistory([...commandHistory, input])
    setHistoryIndex(-1)

    let output: string | JSX.Element = <p className="text-red-400">Command not found: {command}</p>

    // Process command
    if (command in commands) {
      output = commands[command](args)
    }

    // Add to terminal history
    setHistory([
      ...history,
      {
        command: input,
        output,
        timestamp: new Date(),
      },
    ])

    // Clear input
    setInput("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "")
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = history
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "")
      } else {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        height: isMinimized ? "3rem" : "auto",
      }}
      transition={{ duration: 0.5 }}
      className={`${
        theme === "dark" ? "bg-gray-900 border-cyan-500/20" : "bg-gray-100 border-cyan-500/30"
      } border rounded-lg overflow-hidden m-5 ${isFullscreen ? "fixed inset-4 z-50" : "relative"}`}
       id="terminal"
    >
      {/* Terminal header */}
      <div
        className={`flex justify-between items-center px-4 py-2 mb-3  ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-200"
        } border-b ${theme === "dark" ? "border-cyan-500/20" : "border-cyan-500/30"}`}
      >
        <div className="flex items-center">
          <span className={`${theme === "dark" ? "text-cyan-400" : "text-cyan-600"} font-mono font-bold`}>
            royston@portfolio:~$
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className={`p-1 rounded hover:${theme === "dark" ? "bg-gray-700" : "bg-gray-300"}`}
          >
            <Minimize2 className={`h-4 w-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`p-1 rounded hover:${theme === "dark" ? "bg-gray-700" : "bg-gray-300"}`}
          >
            <Maximize2 className={`h-4 w-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
          </button>
          <button
            onClick={() =>
              setHistory([
                {
                  command: "clear",
                  output: null,
                  timestamp: new Date(),
                },
              ])
            }
            className={`p-1 rounded hover:${theme === "dark" ? "bg-gray-700" : "bg-gray-300"}`}
          >
            <X className={`h-4 w-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
          </button>
        </div>
      </div>

      {/* Terminal content */}
      {!isMinimized && (
        <>
          <div
            ref={terminalRef}
            className={`p-4 font-mono text-sm overflow-y-auto ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}
            style={{ height: isFullscreen ? "calc(100% - 6rem)" : "400px" }}
          >
            {history.map((item, index) => (
              <div key={index} className="mb-2">
                {item.command !== "clear" && (
                  <>
                    <div className="flex">
                      <span className={`${theme === "dark" ? "text-cyan-400" : "text-cyan-600"} mr-2`}>
                        roy@portfolio:~$
                      </span>
                      <span>{item.command}</span>
                    </div>
                    {item.output && <div className="mt-1 ml-2">{item.output}</div>}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="flex items-center px-4 py-2 border-t border-gray-700">
            <span className={`${theme === "dark" ? "text-cyan-400" : "text-cyan-600"} mr-2`}>
              <ChevronRight className="h-4 w-4" />
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`flex-1 bg-transparent outline-none ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              } font-mono`}
              autoFocus
            />
          </form>
        </>
      )}
    </motion.div>
  )
}

export function TerminalSection({ theme }: { theme: string }) {
  return (
    <section
      id="terminal"
      className={`py-20 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900/70 to-black/70 "
          : "bg-gradient-to-b from-gray-200/90 to-gray-100/90 "
      } relative `}
    >
      <div className="container mx-auto px-4 ml-20 mr-20 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 relative inline-block ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className={`absolute bottom-0 left-0 h-1 ${theme === "dark" ? "bg-cyan-500" : "bg-cyan-600"}`}
            ></motion.span>
            <span className={`${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`}>&lt;</span> Terminal{" "}
            <span className={`${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`}>/&gt;</span>
          </h2>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
            Explore my coding skills through this interactive terminal. Type{" "}
            <span className="font-mono text-cyan-500">help</span> to see available commands.
          </p>
        </motion.div>

        <TerminalInterface theme={theme} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div
            className={`${
              theme === "dark" ? "bg-gray-800/50 border border-cyan-500/20" : "bg-white/80 border border-cyan-500/30"
            } rounded-lg p-6 backdrop-blur-sm`}
          >
            <h3 className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`}>
              Terminal Features
            </h3>
            <ul className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} list-disc pl-5 space-y-2`}>
              <li>Interactive command-line interface</li>
              <li>Command history navigation (up/down arrows)</li>
              <li>Code samples in multiple languages</li>
              <li>Project information and skills overview</li>
              <li>Fullscreen and minimize options</li>
            </ul>
          </div>

          <div
            className={`${
              theme === "dark" ? "bg-gray-800/50 border border-cyan-500/20" : "bg-white/80 border border-cyan-500/30"
            } rounded-lg p-6 backdrop-blur-sm`}
          >
            <h3 className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`}>
              Try These Commands
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className={`p-2 rounded ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-200/50"}`}>
                <code className="font-mono text-sm">help</code>
              </div>
              <div className={`p-2 rounded ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-200/50"}`}>
                <code className="font-mono text-sm">about</code>
              </div>
              <div className={`p-2 rounded ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-200/50"}`}>
                <code className="font-mono text-sm">skills</code>
              </div>
              <div className={`p-2 rounded ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-200/50"}`}>
                <code className="font-mono text-sm">projects</code>
              </div>
              <div className={`p-2 rounded ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-200/50"}`}>
                <code className="font-mono text-sm">javascript</code>
              </div>
              <div className={`p-2 rounded ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-200/50"}`}>
                <code className="font-mono text-sm">python</code>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
