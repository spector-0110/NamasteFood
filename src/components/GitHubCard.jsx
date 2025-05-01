import React from "react";

class GitHubCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            loading: true,
            error: null,
            username: props.username  // Default username or use prop
        };
    }
    
    render() {
        const { 
            name, 
            company, 
            location, 
            bio, 
            avatar_url, 
            html_url,
            followers,
            following,
            public_repos,
            created_at,
            login,
            email
        } = this.props.userInfo;

        // Format creation date
        const formattedDate = created_at ? new Date(created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) : '';

        return (
            <div className="github-profile-card">
                <div className="profile-header">
                    <img src={avatar_url} alt={name} className="profile-avatar" />
                    <div className="profile-info">
                        <h1 className="profile-name">{name}</h1>
                        <h3 className="profile-username">@{login}</h3>
                        {bio && <p className="profile-bio">{bio}</p>}
                    </div>
                </div>
                
                <div className="profile-details">
                    {location && (
                        <div className="detail-item">
                            <span className="detail-icon">📍</span>
                            <span>{location}</span>
                        </div>
                    )}
                    {company && (
                        <div className="detail-item">
                            <span className="detail-icon">🏢</span>
                            <span>{company}</span>
                        </div>
                    )}
                    <div className="detail-item">
                        <span className="detail-icon">📅</span>
                        <span>Joined on {formattedDate}</span>
                    </div>
                </div>
                
                <div className="profile-stats">
                    <div className="stat-item">
                        <span className="stat-count">{followers}</span>
                        <span className="stat-label">Followers</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-count">{following}</span>
                        <span className="stat-label">Following</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-count">{public_repos}</span>
                        <span className="stat-label">Repos</span>
                    </div>
                </div>
                
                <div className="profile-actions">
                    <a href={html_url} target="_blank" rel="noopener noreferrer" className="github-button">
                        View on GitHub
                    </a>
                    <a href={`mailto:${email || ''}`} className="contact-button">
                        Contact
                    </a>
                </div>
            </div>
        );
    }
}

export default GitHubCard;