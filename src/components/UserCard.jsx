import React from "react";
import GitHubCard from "./GitHubCard";

class UserClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: null,
            loading: true,
            error: null,
            username: props.username
        };
    }

    async componentDidMount() {
        try {
            const data = await fetch(`https://api.github.com/users/${this.state.username}`);
            if (!data.ok) {
                throw new Error(`Failed to fetch user: ${data.status}`);
            }
            const json = await data.json();
            this.setState({
                userInfo: json,
                loading: false
            });

        } catch (error) {
            this.setState({
                error: error.message,
                loading: false
            });
            console.error("Error fetching GitHub data:", error);
        }
    }

    render() {
        const { userInfo, loading, error } = this.state;

        if (loading) {
            return (
                <div className="github-profile-card">
                    <div className="shimmer-img" style={{borderRadius: "50%", width: "120px", height: "120px", margin: "0 auto"}}></div>
                    <div className="shimmer-content" style={{textAlign: "center", padding: "2rem"}}>
                        <div className="shimmer-title" style={{margin: "1rem auto"}}></div>
                        <div className="shimmer-tags" style={{margin: "1rem auto"}}></div>
                        <div className="shimmer-details" style={{margin: "1rem auto"}}></div>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="error">
                    <h2>Error loading GitHub profile</h2>
                    <p>{error}</p>
                </div>
            );
        }

        return <GitHubCard userInfo={userInfo} />;
    }
}

export default UserClass;