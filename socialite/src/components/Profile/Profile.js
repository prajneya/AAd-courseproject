import React, { useState, useContext } from 'react';
import ImageUploader from "react-images-upload";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Swal from 'sweetalert2';

import "../Home/Home.css";
import "./Profile.css";
import Sidebar from "../Sidebar"

import { AuthContext } from '../../context/auth';

const houses = [
                {label: 'Aakash', value:1},
                {label: 'Agni', value:2},
                {label: 'Prithvi', value:3},
                {label: 'Vayu', value:4}
               ]

const hostels = [ 
                  {label: 'Bakul Nivas', value:1},
                  {label: 'Parijaat Nivas', value:2},
                  {label: 'New Boys Hostel', value:3},
                  {label: 'Old Boys Hostel/Palash Nivas', value:4}
                ]

const clubs = [ 
                {label: 'Art Society', value: 1},
                {label: 'Amateur Sports Enthusiasts Club', value: 2},
                {label: 'Astronomy Club', value: 3},
                {label: 'Chess Club', value: 4},
                {label: 'Decore – The Design Club', value: 5},
                {label: 'Developer Student Club', value: 6},
                {label: 'Electronics and Robotics Club', value: 7},
                {label: 'Foreign Language Club', value: 8},
                {label: 'Frivolous Humour Club', value: 9},
                {label: 'Hacking Club', value: 10},
                {label: 'Literary Club', value: 11},
                {label: 'National Service Scheme', value: 12},
                {label: 'Open-SourceDevelopers Group (OSDG)', value: 13},
                {label: 'Pentaprism - The Photography Club', value: 14},
                {label: 'Ping!', value: 15},
                {label: 'Programming Club', value: 16},
                {label: 'The Dance Crew', value: 17},
                {label: 'The Debate Society', value: 18},
                {label: 'The Gaming Club', value: 19},
                {label: 'The Music Club', value: 20},
                {label: 'The TV Room Quiz Club', value: 21},
                {label: 'Theory Group', value: 22},
                {label: 'E-Cell', value: 23}
              ]

const sports = [
                {label: 'Table Tennis', value: 1},
                {label: 'Cricket',value:2},
                {label: 'Football',value:3},
                {label: 'Badminton',value:4},
                {label: 'Chess',value:5},
                {label: 'Carrom',value:6},
                {label: 'Pool',value:7},
                {label: 'Tennis',value:8},
                {label: 'Gym',value:9},
                {label: 'Volleyball',value:10},
                {label: 'Basketball',value:11},
                {label: 'Hockey',value:12},
                {label: 'Yoga',value:13},
                {label: 'Martial-Arts',value:14}
               ]

const animatedComponents = makeAnimated();

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

function Profile(props) {

	const { user } = useContext(AuthContext)
	const { data: profileData } = useQuery(FETCH_PROFILE, {
		variables: {
			curid: user.id,
			id: user.id
		}
	});
	var profiles = profileData ? profileData.profile : "";

	const { data: userTimelineData } = useQuery(FETCH_USER_TIMELINE, {
		variables: {
			id: user.id
		}
	});
	var users = userTimelineData ? userTimelineData.getUserTimelineData : "";

    const [fullName, setFullName] = useState('');
    const [userName, setUserName] = useState('');
    const [fbLink, setFbLink] = useState('');
    const [ghLink, setGhLink] = useState('');
    const [about, setAbout] = useState('');

    const [roomNo, setRoomNo] = useState('');

    const [projectOneTitle, setProjectOneTitle] = useState('');
    const [projectOneGhLink, setProjectOneGhLink] = useState('');
    const [projectOneELink, setProjectOneELink] = useState('');
    const [projectOneBody, setProjectOneBody] = useState('');

    const [projectTwoTitle, setProjectTwoTitle] = useState('');
    const [projectTwoGhLink, setProjectTwoGhLink] = useState('');
    const [projectTwoELink, setProjectTwoELink] = useState('');
    const [projectTwoBody, setProjectTwoBody] = useState('');

    const [projectThreeTitle, setProjectThreeTitle] = useState('');
    const [projectThreeGhLink, setProjectThreeGhLink] = useState('');
    const [projectThreeELink, setProjectThreeELink] = useState('');
    const [projectThreeBody, setProjectThreeBody] = useState('');

    const [house, setHouse] = useState("");
    const [hostel, setHostel] = useState("");
    const [club, setClub] = useState({});
    const [sport, setSport] = useState({});

    async function handleHouseChange(selectedOptions){
        await setHouse(selectedOptions['label'])
    }

    async function handleHostelChange(selectedOptions){
        await setHostel(selectedOptions['label'])
    }

    async function handleClubChange(selectedOptions){
        var temp_club = {}
        if(selectedOptions){
            for(var i = 0; i < selectedOptions.length; i++){
                temp_club[selectedOptions[i].label] = true
            }
        }
        await setClub(temp_club)
    }

    async function handleSportChange(selectedOptions){
        var temp_sport = {}
        if(selectedOptions){
            for(var i = 0; i < selectedOptions.length; i++){
                temp_sport[selectedOptions[i].label] = true
            }
        }
        await setSport(temp_sport)
    }

    const [photo, setPhoto] = useState("");

    async function onDrop(pictureFiles, pictureDataURLs) {
        await setPhoto(pictureFiles[0])
    }

    const [ uploadProfilePic ] = useMutation(UPLOAD_PROFILE_PICTURE, {
        update(_, { data: profilePicUpdate }){
            Swal.fire({title: "Our database is jealous of your beauty.",
                  html: "Profile Picture updated",
                  footer: "Checkout your timeline.",
                  imageUrl: '/img/cat.png',
                  customClass: {
                    title: 'text-success error-message',
                    content: 'error-message text-white',
                    confirmButton: 'game-button bg-danger',
                    image: 'error-image-swal',
                  },
                  background: `rgba(0,0,0,0.9)`
                });
        },
        onError(err){
          if(err.graphQLErrors.length > 0)
            Swal.fire({title: "Our database is jealous of your beauty.",
                  html: Object.values(err.graphQLErrors[0])[0],
                  footer: "The above error popped up while updating your profile picture.",
                  imageUrl: '/img/cat.png',
                  customClass: {
                    title: 'text-danger error-message',
                    content: 'error-message text-white',
                    confirmButton: 'game-button bg-danger',
                    image: 'error-image-swal',
                  },
                  background: `rgba(0,0,0,0.9)`
                });
        },
        variables: { photo }
    })

    function uploadImage(){
        if(photo===""){
            return;
        }
        uploadProfilePic();
    }

    const [ updateProfileDetails ] = useMutation(UPDATE_PROFILE, {
        update(_, { data: updateProfileData }){
            window.location.reload(false);
        },
        onError(err){
          if(err.graphQLErrors.length > 0)
            Swal.fire({title: "You must be the mysterious one!",
                  html: Object.values(err.graphQLErrors[0])[0],
                  footer: "The above error popped up while updating your personal details.",
                  imageUrl: '/img/sorry.png',
                  customClass: {
                    title: 'text-danger error-message',
                    content: 'error-message text-white',
                    confirmButton: 'game-button bg-danger',
                    image: 'error-image-swal',
                  },
                  background: `rgba(0,0,0,0.9)`
                });
        },
        variables: { "name": fullName,
		    "username": userName,
                    "fblink": fbLink,
                    "ghlink": ghLink,
                    "about": about,
                    "house": house,
                    "clubs": club,
                    "hostel": hostel,
                    "sports": sport,
                    "pOneTitle": projectOneTitle,
                    "pOneGhLink": projectOneGhLink,
                    "pOneELink": projectOneELink,
                    "pOneDesc": projectOneBody,
                    "pTwoTitle": projectTwoTitle,
                    "pTwoGhLink": projectTwoGhLink,
                    "pTwoELink": projectTwoELink,
                    "pTwoDesc": projectTwoBody,
                    "pThreeTitle": projectThreeTitle,
                    "pThreeGhLink": projectThreeGhLink,
                    "pThreeELink": projectThreeELink,
                    "pThreeDesc": projectThreeBody,
                    "roomNo": roomNo }
    })
    
    async function profileUpdateCallBack(){
        await setFullName(document.getElementById('fullname').value);
        await setUserName(document.getElementById('username').value);
        await setFbLink(document.getElementById('fblink').value);
        await setGhLink(document.getElementById('ghlink').value);
        await setAbout(document.getElementById('about').value);

        await setRoomNo(parseInt(document.getElementById('roomNo').value));

        await setProjectOneTitle(document.getElementById('pOneTitle').value);
        await setProjectOneGhLink(document.getElementById('pOneGhLink').value);
        await setProjectOneELink(document.getElementById('pOneELink').value);
        await setProjectOneBody(document.getElementById('pOneDesc').value);

        await setProjectTwoTitle(document.getElementById('pTwoTitle').value);
        await setProjectTwoGhLink(document.getElementById('pTwoGhLink').value);
        await setProjectTwoELink(document.getElementById('pTwoELink').value);
        await setProjectTwoBody(document.getElementById('pTwoDesc').value);

        await setProjectThreeTitle(document.getElementById('pThreeTitle').value);
        await setProjectThreeGhLink(document.getElementById('pThreeGhLink').value);
        await setProjectThreeELink(document.getElementById('pThreeELink').value);
        await setProjectThreeBody(document.getElementById('pThreeDesc').value);

        updateProfileDetails();
    }

  
    return (
        <>
        <Sidebar/>
        <main class="s-layout__content">
            <div className="container-fluid">
                <div className="create-post-container">
                    <div className="create-post-header">User Profile</div>
                    <form action={uploadImage}>
                        <ImageUploader
                            withIcon={true}
                            buttonText="Change Profile Picture"
                            onChange={onDrop}
                            imgExtension={[".jpg", ".jpeg", ".png"]}
                            maxFileSize={3242880}
                            withPreview={true}
                            singleImage={true}
                            accept="Accept"
                          />
                          <button className="btn-submit" type="button" onClick={uploadImage}>Update Profile Picture</button>
                    </form>
                    <form> 
                        <div className="row">
                            <div className="col-md-6">
                                <label>FULL NAME</label>
                                <input defaultValue={users.name} id="fullname"/>
                                <label>FACEBOOK LINK</label>
                                <input defaultValue={users.fblink} id="fblink"/>
                            </div>
                            <div className="col-md-6">
                                <label>USERNAME</label>
                                <input id="username" defaultValue={user.username} />
                                <label>GITHUB LINK</label>
                                <input defaultValue={users.ghlink} id="ghlink"/>
                            </div>
                        </div>
                        <label>ABOUT YOU</label> <br/>
                        <textarea defaultValue={users.bio} id="about"/>
                        <div className="row">
                            <div className="col-md-6">
                                <label>HOUSE(Currently Saved: {profiles ? profiles.house.val : ""})</label>
                                <Select
                                      styles={customStyles}
                                      closeMenuOnSelect={false}
                                      components={animatedComponents}
                                      options={houses}
                                      onChange={handleHouseChange}
                                      theme={theme => ({
                                              ...theme,
                                              borderRadius: 0,
                                              colors: {
                                                ...theme.colors,
                                                primary25: '#00adb5',
                                                primary: 'black',
                                              },
                                            })}
                                    />
                                <label>HOSTEL(Currently Saved: {profiles ? profiles.hosname.val : ""})</label>
                                <Select
                                      styles={customStyles}
                                      closeMenuOnSelect={false}
                                      components={animatedComponents}
                                      options={hostels}
                                      onChange={handleHostelChange}
                                      theme={theme => ({
                                              ...theme,
                                              borderRadius: 0,
                                              colors: {
                                                ...theme.colors,
                                                primary25: '#00adb5',
                                                primary: 'black',
                                              },
                                            })}
                                    />
                            </div>
                            <div className="col-md-6">
                                <label>CLUBS(Currently Saved: {profiles ? profiles.clubs.val.join(', ') : ""})</label>
                                <Select
                                      styles={customStyles}
                                      closeMenuOnSelect={false}
                                      components={animatedComponents}
                                      isMulti
                                      options={clubs}
                                      onChange={handleClubChange}
                                      theme={theme => ({
                                              ...theme,
                                              borderRadius: 0,
                                              colors: {
                                                ...theme.colors,
                                                primary25: '#00adb5',
                                                primary: 'black',
                                              },
                                            })}
                                    />
                                <label>SPORTS(Currently Saved: {profiles ? profiles.sports.val.join(', ') : ""})</label>
                                <Select
                                      styles={customStyles}
                                      closeMenuOnSelect={false}
                                      components={animatedComponents}
                                      isMulti
                                      options={sports}
                                      onChange={handleSportChange}
                                      theme={theme => ({
                                              ...theme,
                                              borderRadius: 0,
                                              colors: {
                                                ...theme.colors,
                                                primary25: '#00adb5',
                                                primary: 'black',
                                              },
                                            })}
                                    />                            
                            </div>
                        </div>
                        <label>ROOM NUMBER(Currently Saved: {profiles ? profiles.hosnum.val : ""})</label>
                        <input type="number" id="roomNo"/>
                        <hr/>
                        <label style={{color: 'yellow'}}>PROJECT 1</label> <br/>
                        <label>PROJECT TITLE</label>
                        <input defaultValue={users.pOneTitle} id="pOneTitle"/>
                        <label>PROJECT GITHUB LINK</label>
                        <input defaultValue={users.pOneGhLink} id="pOneGhLink"/>
                        <label>PROJECT LINK (EXTERNAL)</label>
                        <input defaultValue={users.pOneELink} id="pOneELink"/>
                        <label>PROJECT DESCRIPTION</label> <br/>
                        <textarea defaultValue={users.pOneDesc} id="pOneDesc"/>
                        <hr/>
                        <label style={{color: 'yellow'}}>PROJECT 2</label> <br/>
                        <label>PROJECT TITLE</label>
                        <input defaultValue={users.pTwoTitle} id="pTwoTitle"/>
                        <label>PROJECT GITHUB LINK</label>
                        <input defaultValue={users.pTwoGhLink} id="pTwoGhLink"/>
                        <label>PROJECT LINK (EXTERNAL)</label>
                        <input defaultValue={users.pTwoELink} id="pTwoELink"/>
                        <label>PROJECT DESCRIPTION</label> <br/>
                        <textarea defaultValue={users.pTwoDesc} id="pTwoDesc"/>
                        <hr/>
                        <label style={{color: 'yellow'}}>PROJECT 3</label> <br/>
                        <label>PROJECT TITLE</label>
                        <input defaultValue={users.pThreeTitle} id="pThreeTitle"/>
                        <label>PROJECT GITHUB LINK</label>
                        <input defaultValue={users.pThreeGhLink} id="pThreeGhLink"/>
                        <label>PROJECT LINK (EXTERNAL)</label>
                        <input defaultValue={users.pThreeELink} id="pThreeELink"/>
                        <label>PROJECT DESCRIPTION</label> <br/>
                        <textarea defaultValue={users.pThreeDesc} id="pThreeDesc"/>
                        <button className="btn-submit" type="button" onClick={profileUpdateCallBack}>Save Details</button>
                    </form>
                </div>
            </div>
        </main>
        </>
    )
}

const UPLOAD_PROFILE_PICTURE = gql`
  mutation uploadPhoto(
    $photo: Upload!
  ) {
    uploadPhoto(
        photo: $photo
    )
  }
`;

const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $name: String
    $username: String
    $fblink: String
    $ghlink: String
    $about: String
    $house: String
    $clubs: JSONObject
    $hostel: String
    $sports: JSONObject
    $pOneTitle: String
    $pOneGhLink: String
    $pOneELink: String
    $pOneDesc: String
    $pTwoTitle: String
    $pTwoGhLink: String
    $pTwoELink: String
    $pTwoDesc: String
    $pThreeTitle: String
    $pThreeGhLink: String
    $pThreeELink: String
    $pThreeDesc: String
    $roomNo: Int
  ) {
    updateProfile(
        name: $name
        username: $username
        fblink: $fblink
        ghlink: $ghlink
        about: $about
        house: $house
        clubs: $clubs
        hostel: $hostel
        sports: $sports
        pOneTitle: $pOneTitle
        pOneGhLink: $pOneGhLink
        pOneELink: $pOneELink
        pOneDesc: $pOneDesc
        pTwoTitle: $pTwoTitle
        pTwoGhLink: $pTwoGhLink
        pTwoELink: $pTwoELink
        pTwoDesc: $pTwoDesc
        pThreeTitle: $pThreeTitle
        pThreeGhLink: $pThreeGhLink
        pThreeELink: $pThreeELink
        pThreeDesc: $pThreeDesc
        roomNo: $roomNo
    )
  }
`;

const FETCH_PROFILE = gql`
    query($curid: String!, $id: String!){
        profile(curid: $curid, id: $id){
		hosnum {
			val 
			flag
		}
		hosname {
			val 
			flag
		}
		house {
			val 
			flag
		}
		sports {
			val 
			flag
		}
		clubs {
			val 
			flag
		}
        }
    }
`;

const FETCH_USER_TIMELINE = gql`
    query($id: ID){
        getUserTimelineData(id: $id)
    }
`;

export default Profile;
