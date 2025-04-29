import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeProvider';

const Shimmer = () => {
    const [items, setItems] = useState(Array(12).fill(null));
    const { theme } = useContext(ThemeContext);
    
    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 300
            >= document.documentElement.offsetHeight
        ) {
            // Add more items when user approaches bottom
            setItems(prev => [...prev, ...Array(8).fill(null)]);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return ( 
        <div className={`shimmer-container ${theme === 'dark' ? 'shimmer-container-dark' : ''}`}>
            {items.map((_, index) => (
                <div key={index} className={`shimmer-card ${theme === 'dark' ? 'shimmer-card-dark' : ''}`}>
                    <div className="shimmer-img"></div>
                    <div className="shimmer-content">
                        <div className="shimmer-title"></div>
                        <div className="shimmer-tags"></div>
                        <div className="shimmer-details"></div>
                        <div className="shimmer-details shimmer-details-half"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Shimmer;