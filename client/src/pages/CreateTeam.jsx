import {useState} from "react";
import axios from "axios";


const CreateTeam = () => {
    //Creation of State Variables to store all our input values
    //ladderID
    //captainUsername
    //challengeID
    //ladderPosition
    const [teamName,setTeamName] = useState("");
    const [ladderID,setLadderID] = useState("");
    const [captainUsername,setCaptainUsername] = useState("")
    const [challengeID,setChallengeID] = useState("");
    const [ladderPosition,setLadderPosition] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [users,setUsers] = useState([{name: "", email: ""}]);

    //Creation of Form Submission
    const formSubmit = async (e) => {
        //Check for any submission fault=
        e.preventDefault(); 

        //Post Request to create a new team input form data
        try {
            const response = await axios.post("http://localhost:5555/teams", {
                teamName,
                ladderID,
                captainUsername,
                challengeID,
                ladderPosition,
                users: users.map(({name,email}) => ({name,email})),
            });
            console.log("Team created succesfully", response.data);
            setShowSuccessMessage(true);

            //Reset out Fields when submission is done

            setTeamName("");
            setLadderID("");
            setCaptainUsername("");
            setChallengeID("");
            setLadderPosition("");
            setUsers([{name: "", email: ""}]);
        } catch (error) {
            console.error("Error Creating Team", error);
        }

    };

    // Handle User change in user input for team members
    const handleUserChange = (index,key,value) => {
        //Create a copy of current team members array
        const updatedUsers = [...users];
        //Udate the Users with its property
        updatedUsers[index][key] = value;
        //Update the state of modified team members array
        setUsers(updatedUsers);
    }

    //Handle adding a new user to team
    const addUser = () => {
        // Add a new user to the team member array
        setUsers([...users, {name: "", email: ""}]);
    };

    //Handle removing a user from a team
    const removeUser = (index) =>  {
        //Create a copy of current team members array
        const updatedUsers = [...users];
        //Removinb the user at a specified index
        updatedUsers.splice(index,1);
        //Updating the state with modified team members array
        setUsers(updatedUsers);
    };
    
    
    const closePopup =() => {
        setShowSuccessMessage(false);
    };

   
    const formStyle = {
        background: "linear-gradient(135deg, #FFA500, #990033)",
        boxShadow: "0 1px 50px rgba(0,0,0,0.25)",
        borderRadius: "40px",
        padding: "5rem", // Adjusted padding for better spacing
        maxWidth: "90%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center the content horizontally
        marginTop: "10vh", // Adjusted margin top
        position: "relative",
    };
 
    
        return (
            <div className="flex justify-center items-center">
            <div className="max-w-md w-full p-8 bg-white rounded shadow-lg" style={formStyle}>
                <h1 className="text-4xl font-bold mb-4 text-center" style = {{marginTop: "-2rem"}}>Team Registration Form</h1>
                <form onSubmit={formSubmit} style={{ textAlign: 'center', width: "100%" }}>
                 <div className = "flex justify-between mb-4">
                    <div style = {{width: "45%", marginTop: "3rem"}}>
                    <label htmlFor="teamName" className = "block font-bold text-left mb-2">Team Name:</label>
                    <input
                        id="teamName"
                        placeHolder = "Example: Team Avengers"
                        type= "text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        className = "bg-gray-200 px-4 py-2 rounded w-full"
                        required
                    />
                    </div>
                    <div style = {{width: "45%", marginTop: "3rem"}}>
                    <label htmlFor="ladderID" className = "block font-bold text-left mb-2">Ladder ID:</label>
                        <input 
                            id = "ladderID"
                            type = "number"
                            value = {ladderID}
                            onChange = {(e) => setLadderID(e.target.value)}
                            className = "bg-gray-200 px-4 py-2 rounded w-full"
                            required
                        />
                      </div>
                    </div>
                    <div className = "flex justify-between mb-4">
                        <div style = {{width: "45%", marginTop: "3rem"}}>
                    <label htmlFor="captainUsername" className = "block font-bold text-left mb-2">Captain Username:</label>
                        <input 
                            id = "captainUsername"
                            placeHolder = "Example: player@gmail.com"
                            type = "text"
                            value = {captainUsername}
                            onChange={(e) => setCaptainUsername(e.target.value)}
                            className = "bg-gray-200 px-4 py-2 rounded w-full"
                            required
                        />
                    </div>
                    <div style = {{width: "45%", marginTop: "3rem"}}>
                    <label htmlFor="ChallengeID" className = "block font-bold text-left mb-2">Challenge ID:</label>
                        <input 
                            id = "ChallengeID"
                            type = "number"
                            value = {challengeID}
                            onChange={(e) => setChallengeID(e.target.value)}
                            className = "bg-gray-200 px-4 py-2 rounded w-full" 
                            required
                        />
                     </div>
                   </div>
                   <div style = {{width: "45%", marginTop: "3 rem"}}>
                     <label htmlFor="ladderPosition" className = "block font-bold text-left w-full mb-2">Ladder Position:</label>
                        <input 
                            id = "ladderPosition"
                            type = "number"
                            value = {ladderPosition}
                            onChange={(e) => setLadderPosition(e.target.value)}
                            className = "bg-gray-200 px-4 py-2 rounded w-full" 
                            required
                        />
                    </div>
                       <div className = "flex flex-col" style = {{marginTop: "3rem"}}>
                        <h2 className = "text-xl font-bold mb-4 text-left"> Add Players: </h2>
                        {users.map((user,index) => (
                            <div key = {index} className = "flex items-center mb-2"> 
                              <input 
                                type = "text"
                                placeholder = "Name"
                                value = {user.name}
                                onChange= {(e) => handleUserChange(index, "name", e.target.value)}
                                className = "bg-gray-200 px-5 py-2 rounded"
                                style={{ width: "180px", marginRight: "8px"}} // Fixed width for name input
                                required
                             />
                             <input
                                type = "email"
                                placeholder = "Email"
                                value = {user.email}
                                onChange = {(e) => handleUserChange(index,"email", e.target.value)}
                                className = "bg-gray-200 px-4  py-2 rounded mr-2"
                                style={{ width: "200px",  marginRight: "8px" }} // Fixed width for name input
                                required
                            />
                            {index > 0 && (
                                <button type = "button" onClick = {() => removeUser(index)} className = "bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors">
                                  -
                                </button>
                            )}
                          </div>
                        ))}
                            <button
                                type = "button"
                                onClick = {addUser}
                                className = "bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
                                style = {{alignSelf: 'flex-start', marginLeft: '1px', marginTop: '8px'}}
                            >
                                +
                            </button>
                        </div>
                        <div style = {{display: "flex", justifyContent: "center", marginBottom: "20px"}}>
                        <button 
                       
                        type="submit" 
                        className="bg-white text-black px-7 py-3 rounded-full hover:bg-orange-600 transition-colors "
                        style = {{ color: "white",background: "linear-gradient(135deg, #FFA500, #FF4500)", fontWeight: "bold",  width: "200px"}}>
                        Create Team
                        </button>
                      </div>
                </form>
            </div>
            {showSuccessMessage && (
                <div className = "fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className = "bg-white p-8 rounded shadow-lg text-center">
                        <h2 className = "text-2xl font-bold mb-4"> Team Created Successfully!</h2>
                        <button onClick = {closePopup} className = "bg-orange-500 text-white px-4 py-2 rounded hover: bg-blue-600">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};  

export default CreateTeam



