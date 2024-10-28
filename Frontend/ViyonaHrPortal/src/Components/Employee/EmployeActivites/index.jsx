

import { FaExclamationTriangle } from 'react-icons/fa';
import { FaArrowLeft } from "react-icons/fa";
import './index.css'
function EmployeeActivities() {
    const activities = [
        {
            time: "Just now",
            title: "Add New Task",
            description: "Web by far While that's mock-ups and this is politics Lorem card.",
            team: ['User1', 'User2'],
            type: 'task',
            warning: null,
        },
        {
            time: "6 mins ago",
            title: "Lucid Admin Code Upload on Github",
            description: "web by far While that's mock-ups and this is politics, are they really so different?",
            team: ['Jessica Doe'],
            type: 'code',
            warning: "I am getting an error when trying to push to GitHub. It will not let me push.",
        },
        {
            time: "15 mins ago",
            title: "Assigning a project team",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            team: ['Jessica Doe', 'User3', 'User4'],
            type: 'assignment',
            warning: null,
        },
    ];

    return (
        <div>
            <div className='dashboard-text'>
                <div className="flex-dashboard-text">
                    <FaArrowLeft width={12} height={14} color="#3408A4" />
                    <h1 className="main-home-head">Events</h1>
                </div>
                <div>
                    <p><span className="viyona-text">VIYONA</span> <span className="viyona-span">/ Dashboard</span></p>
                </div>
            </div>

            <div className="timeline-container">
                <div className='timeline-subcontainer'>
                    {activities.map((activity, index) => (
                        <div className="timeline-item" key={index}>
                            <div className="timeline-icon" />
                            <div className="timeline-content">
                                <div className="timeline-header">
                                    <span className="timeline-time">{activity.time}</span>
                                    <h3 className="timeline-title">{activity.title}</h3>
                                </div>
                                <p>{activity.description}</p>
                                {activity.warning && (
                                    <div className="warning-box">
                                        <FaExclamationTriangle color="#F39C12" />
                                        <span>{activity.warning}</span>
                                    </div>
                                )}
                                <div className="team-section">
                                    <span>Team:</span>
                                    <div className="team-members">
                                        {activity.team.map((member, i) => (
                                            <div className="team-member" key={i}>{member}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EmployeeActivities;
