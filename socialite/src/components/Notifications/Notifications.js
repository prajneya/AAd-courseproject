import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import gql from 'graphql-tag';
import Swal from 'sweetalert2';
import moment from "moment-timezone"
import '../Recommend/Recommend.css';

import { AuthContext } from '../../context/auth'

import "./notifications.css"
import Sidebar from "../Sidebar";

function Notifications(props){

    const { user } = useContext(AuthContext);

    const user_id = user.id;
    const [fren_id, setfren_id] = useState('');
	const [values, setValues] = useState({});

	const [meetedit] = useMutation(MEET_EDIT, {
		update(_, { data: { login: userData } }){
			window.location.reload(false);
		},
        onError(err){
          if(err.graphQLErrors.length > 0)
            Swal.fire({title: "The Mafia hijacked our convoy.",
                  html: Object.values(err.graphQLErrors[0])[0],
                  footer: "The above error popped up while editing the meet request.",
                  imageUrl: '/img/study.png',
                  customClass: {
                    title: 'text-danger error-message',
                    content: 'error-message text-white',
                    confirmButton: 'game-button bg-danger',
                    image: 'error-image-swal',
                  },
                  background: `rgba(0,0,0,0.9)`
                });
        },
		variables: {
			'sender': values.sender,
				'sendee': values.sendee,
				'type': values.type,
				'date': values.date,
				'time': values.time,
				'duration': values.duration,
				'link': values.link,
				'msg': values.msg,
				'place': values.place,
				'notif': values.notif,
		}
})

    const [frenaccept] = useMutation(FREN_ACCEPT, {
        update(_, { data: { login: userData } }){
          window.location.reload(false);
        },
        onError(err){
          if(err.graphQLErrors.length > 0)
            Swal.fire({title: "Our pigeon got lost somewhere.",
                  html: Object.values(err.graphQLErrors[0])[0],
                  footer: "The above error popped up while accepting the friend request.",
                  imageUrl: '/img/pigeon.png',
                  customClass: {
                    title: 'text-danger error-message',
                    content: 'error-message text-white',
                    confirmButton: 'game-button bg-danger',
                    image: 'error-image-swal',
                  },
                  background: `rgba(0,0,0,0.9)`
                });
        },
        variables: {
            user_id,
            fren_id
        }
    })

    const [frenreject] = useMutation(FREN_REJECT, {
        update(_, { data: { login: userData } }){
          window.location.reload(false);
        },
        onError(err){
          if(err.graphQLErrors.length > 0)
            Swal.fire({title: "Our pigeon got lost somewhere.",
                  html: Object.values(err.graphQLErrors[0])[0],
                  footer: "The above error popped up while ignoring the friend request.",
                  imageUrl: '/img/pigeon.png',
                  customClass: {
                    title: 'text-danger error-message',
                    content: 'error-message text-white',
                    confirmButton: 'game-button bg-danger',
                    image: 'error-image-swal',
                  },
                  background: `rgba(0,0,0,0.9)`
                });
        },
        variables: {
            user_id,
            fren_id
        }
    })

    const [meetaccept] = useMutation(MEET_ACCEPT, {
        update(_, { data: { login: userData } }){
          window.location.reload(false);
        },
        onError(err){
          if(err.graphQLErrors.length > 0)
            Swal.fire({title: "The Mafia hijacked our convoy.",
                  html: Object.values(err.graphQLErrors[0])[0],
                  footer: "The above error popped up while accepting the meet request.",
                  imageUrl: '/img/study.png',
                  customClass: {
                    title: 'text-danger error-message',
                    content: 'error-message text-white',
                    confirmButton: 'game-button bg-danger',
                    image: 'error-image-swal',
                  },
                  background: `rgba(0,0,0,0.9)`
                });
        },
        variables: {
            user_id,
            fren_id
        }
    })

    const [meetreject] = useMutation(MEET_REJECT, {
        update(_, { data: { login: userData } }){
          window.location.reload(false);
        },
        onError(err){
          if(err.graphQLErrors.length > 0)
            Swal.fire({title: "The Mafia hijacked our convoy.",
                  html: Object.values(err.graphQLErrors[0])[0],
                  footer: "The above error popped up while ignoring the meet request.",
                  imageUrl: '/img/study.png',
                  customClass: {
                    title: 'text-danger error-message',
                    content: 'error-message text-white',
                    confirmButton: 'game-button bg-danger',
                    image: 'error-image-swal',
                  },
                  background: `rgba(0,0,0,0.9)`
                });
        },
        variables: {
            user_id,
            fren_id
        }
    })

	const [loadMeet, { data: meetData }] = useLazyQuery(FETCH_MEET, { 
		async onCompleted(){
			await Swal.fire({
			title: 'Meet Details',
			html: `
			    <label class="d-inline-block text-warning" for="type">Type:<span class="text-danger">*</span></label>
					<input type="radio" id="online" name="option" value="online" ${meetData.meetDisp['type']==="online" ? "checked" : ""}>
	    			<label for="online">Online</label>
	    			<input type="radio" id="offline" name="option" value="offline" ${meetData.meetDisp['type']==="online" ? "" : "checked"}>
	    			<label for="offline">Offline</label><br><br>
				    <div class="textfield">
					<label class="d-inline-block text-warning" for="date">Date:<span class="text-danger">*</span></label>
					<input class="d-inline-block" value="${meetData.meetDisp['date']}" type="date" id="date" name="date" placeholder="dd-mm-yyyy" min="" onChange={onChange} />
				    </div><br>
				    <div class="textfield">
					<label class="text-warning" for="time">Time (IST):<span class="text-danger">*</span></label>
					<input type="time" value="${meetData.meetDisp['time']}" id="time" name="time" placeholder="Enter meet time" onChange={onChange} />
				    </div><br>
				    <div class="textfield">
					<label class="text-warning" for="duration">Duration(in minutes):</label>
					<input type="number" value="${meetData.meetDisp['duration']}" id="duration" name="duration" placeholder="Enter meet duration" onChange={onChange} />
				    </div><br>
				    <div class="textfield">
					<label class="text-warning" for="msg">Message:</label>
					<textarea type="text" id="msg"name="msg" placeholder="Craft a beautiful message. Maybe drop your Instagram ID first? No one likes a creep." onChange={onChange}>${meetData.meetDisp['msg']}</textarea>
				    </div><br>
				    <div class="textfield">
					<label class="text-warning" for="link">Link:</label>
					<input type="text" value="${meetData.meetDisp['link']}" id="link" name="link" placeholder="Enter meet link (if online)" onChange={onChange} />
				    </div><br>
				    <div class="textfield">
					<label class="text-warning" for="place">Place:</label>
					<input type="text" value="${meetData.meetDisp['place']}" id="place" name="place" placeholder="Enter meet location (if offline)" onChange={onChange} />
				    </div><br>
				    <div class="notif">
					<label class="text-warning" for="notif">Reminder:<span class="text-danger">*</span></label>
					<input type="radio" id="reminder_yes" name="options" value=true ${meetData.meetDisp['notif'] ? "checked" : ""}><label for="reminder_yes">Yes</label>
					<input type="radio" id="reminder_no" name="options" value=false ${meetData.meetDisp['notif'] ? "" : "checked"}><label for="reminder_no">No</label>
				    </div>
		    `,
			confirmButtonText: 'Schedule Meet',
			showCancelButton: true,
			focusConfirm: false,
			width: '64rem',
		    backdrop: `rgba(0,0,0,0.9)`,
			background: `rgba(0,0,0,0.9)`,
			customClass: {
								title: 'text-danger',
								content: 'text-left text-white',
								confirmButton: 'game-button bg-danger',
							},
			preConfirm: () => {
				var types = document.getElementsByName('option')
				var i, save
				for(i = 0; i < types.length; ++i)
				{
					if(types[i].checked)
						save = types[i].value
				}

				const type = save
				const date = Swal.getPopup().querySelector('#date').value
				const time = Swal.getPopup().querySelector('#time').value
				const duration = Swal.getPopup().querySelector('#duration').value
				const link = Swal.getPopup().querySelector('#link').value
				const msg = Swal.getPopup().querySelector('#msg').value
				const place = Swal.getPopup().querySelector('#place').value
				var notifs = document.getElementsByName('options')
				for(i = 0; i < notifs.length; ++i)
				{
					if(notifs[i].checked)
						save = notifs[i].value
				}
				const notif = save

				if(!type)
				{
					Swal.showValidationMessage(
						`Type is a required field`
					)
				}
				else if(!date)
				{
					Swal.showValidationMessage(
						`Date is a required field`
					)
				}
				else if(!time)
				{
					Swal.showValidationMessage(
						`Time is a required field`
					)
				}
				else if(!notif)
				{
					Swal.showValidationMessage(
						`Reminder is a required field`
					)
				}

				var fdate, ftime, fts, now
				moment.tz.setDefault('Asia/Calcutta')
				fdate = moment(date).format("DD-MM-YYYY")
				ftime = moment(moment(time, "HH:mm:ss")).format("HH:mm:ss")
				fts = moment(`${fdate} ${ftime}`, 'DD-MM-YYYY HH:mm:ss').format();
				fts = moment(fts)
				now = moment().format('YYYY-MM-DD HH:mm:ss')
				now = moment(now)

				if(now > fts)
				{
					Swal.showValidationMessage(
						`Invalid timestamp`
					)
				}

				return { type: type, date: date, time: time, duration: duration, link: link, msg: msg, place: place, notif: notif }
			}
			}).then((result) => {
				if(!result.isConfirmed)
					return;
				if(result.value.notif == "true")
					result.value.notif = true
				else
					result.value.notif = false 

				result.value.duration = Number(result.value.duration)
				values.sender = user_id
				values.sendee = fren_id
				values.type = result.value.type
				values.date = result.value.date
				values.time = result.value.time
				values.duration = result.value.duration
				values.link = result.value.link
				values.msg = result.value.msg
				values.place = result.value.place
				values.notif = result.value.notif
				meetedit();
			})
		},
		variables: { 
			user_id,
			fren_id
		} 
	});

	async function do_meetedit(e, fren_id){
		e.stopPropagation()
		await setfren_id(fren_id);
		loadMeet();
	}

    async function do_frenaccept(e, fren_id){
	    e.stopPropagation()
		document.getElementById("facc").disabled = true
        await setfren_id(fren_id);
        frenaccept();
    }

    async function do_frenreject(e, fren_id){
	    e.stopPropagation()
	document.getElementById("frej").disabled = true
        await setfren_id(fren_id);
        frenreject();
    }

    async function do_meetaccept(e, fren_id){
	    e.stopPropagation()
		document.getElementById("macc").disabled = true
        await setfren_id(fren_id);
        meetaccept();
    }

    async function do_meetreject(e, fren_id){
	    e.stopPropagation()
		document.getElementById("mrej").disabled = true
        await setfren_id(fren_id);
        meetreject();
    }

    const [notificationId, setNotificationId] = useState("");

    const [meetview, { data: meetViewData }] = useLazyQuery(FETCH_MEETDETS, { 
    	async onCompleted(){
    		await Swal.fire({
			title: 'Meet Details',
			html: `
			    <label class="d-inline-block text-warning" for="type">Type:<span class="text-danger">*</span></label>
			    	<div class="textfield">
					<input class="d-inline-block" value="${meetViewData.schedMeet['type']}" type="text" id="type" name="type" readonly />
					</div><br>
				    <div class="textfield">
					<label class="d-inline-block text-warning" for="date">Date:<span class="text-danger">*</span></label>
					<input class="d-inline-block" value="${meetViewData.schedMeet['date']}" type="date" id="date" name="date" placeholder="dd-mm-yyyy" min="" readonly />
				    </div><br>
				    <div class="textfield">
					<label class="text-warning" for="time">Time (IST):<span class="text-danger">*</span></label>
					<input type="time" value="${meetViewData.schedMeet['time']}" id="time" name="time" placeholder="Enter meet time" readonly />
				    </div><br>
				    <div class="textfield">
					<label class="text-warning" for="duration">Duration(in minutes):</label>
					<input type="number" value="${meetViewData.schedMeet['duration']}" id="duration" name="duration" placeholder="Enter meet duration" readonly />
				    </div><br>
				    <div class="textfield">
					<label class="text-warning" for="msg">Message:</label>
					<textarea type="text" id="msg"name="msg" placeholder="Craft a beautiful message. Maybe drop your Instagram ID first? No one likes a creep." readonly>${meetViewData.schedMeet['msg']}</textarea>
				    </div><br>
				    <div class="textfield">
					<label class="text-warning" for="link">Link:</label>
					<input type="text" value="${meetViewData.schedMeet['link']}" id="link" name="link" placeholder="Enter meet link (if online)" readonly />
				    </div><br>
				    <div class="textfield">
					<label class="text-warning" for="place">Place:</label>
					<input type="text" value="${meetViewData.schedMeet['place']}" id="place" name="place" placeholder="Enter meet location (if offline)" readonly />
				    </div><br>
				    <div class="notif">
					<label class="text-warning" for="notif">Reminder:<span class="text-danger">*</span></label>
					<div class="textfield">
					<input class="d-inline-block" value="${meetViewData.schedMeet['notif'] ? "Reminder is on" : "Reminder is off"}" type="text" id="notif" name="nbtif" readonly />
				    </div>
				    </div>
		    `,
		    confirmButtonText: 'Okay!',
			showCancelButton: false,
			focusConfirm: false,
			width: '64rem',
		    backdrop: `rgba(0,0,0,0.9)`,
			background: `rgba(0,0,0,0.9)`,
			customClass: {
								title: 'text-danger',
								content: 'text-left text-white',
								confirmButton: 'game-button bg-danger',
							}
			})
    	},
    	variables: {
    		notifid : notificationId
    	}
    })

    async function do_meetview(e, notif_id){
    	e.stopPropagation()
    	await setNotificationId(notif_id);
    	meetview();
    }


    const { data: notifs, loading } = useQuery(FETCH_NOTIFICATIONS_QUERY, {
        variables: {
            user_id
        }
    });

    if(loading){
        return (<><div id="overlay" style={{display: "block"}}></div>
            <div id="vibe-animation" style={{display: "block"}}><div className="loader">Loading...</div><br/>HACKING PEERSITY ...</div></>)
    }

    var notifications = notifs ? notifs.getNotif : "";

    const redirectUserCallback = (username) => {
      props.history.push('/profile/'+username)
    }

    return (
            <>
            <Sidebar/>
            <main class="s-layout__content">
                <div className="container-fluid">

                    <div className="mt-5">
                    <div className="wall subsection-header"> RESPOND TO YOUR REQUESTS HERE 
	    <br />
	    {notifications.length === 0 ? "Sorry no notifications for you :(": ""}
	    </div>
                        <div className="notifications-container">
                        <div className="row">
                            {notifications && notifications.map(notification => (
                                <div className="col-lg-12">
                                    <div className="notifications" onClick={() => redirectUserCallback(notification['username'])}>
                                        <div className="notification-content">
                                            <div className="text-left d-inline-block">
                                            <strong>Username: {notification['username']}</strong>
                                            <br />
                                            <strong>Email: {notification['email']}</strong>
                                            <br />
                                            Friend Match Probability: {Math.round((notification['match'] + Number.EPSILON) * 100)/100}%
                                            <br />
                                            </div>
                                            <div className="w-100 text-right d-inline-block">
                                            {notification['type'] === "freq" ? 
                                            <div>
                                                <button id="facc" className="rounded ml-1 my-2 interact" onClick={(event) => do_frenaccept(event, notification['userId'])}>ACCEPT FRIEND REQUEST</button>
                                                <button id="frej" className="rounded ml-1 my-2 interact" onClick={(event) => do_frenreject(event, notification['userId'])}>IGNORE FRIEND REQUEST</button>
                                            </div>
                                            : ""}
                                            {notification['type'] === "mreq" ?
                                            <div>
                                                <button id="medit" className="rounded ml-1 my-2 interact" onClick={(event) => do_meetedit(event, notification['userId'])}>EDIT MEET DETAILS</button>
                                                <button id="macc" className="rounded ml-1 my-2 interact" onClick={(event) => do_meetaccept(event, notification['userId'])}>ACCEPT MEET UP</button>
                                                <button id="mrej" className="rounded ml-1 my-2 interact" onClick={(event) => do_meetreject(event, notification['userId'])}>IGNORE MEET UP</button>
                                            </div>
                                            : ""}
                                            {notification['type'] === "facc" ?
                                            <div>
                                                {notification['username']} accepted your friend request!     
                                            </div>
                                            : ""}
                                            {notification['type'] === "macc" ?
                                            <div>
                                                <button id="mdet" className="rounded ml-1 my-2 interact" onClick={(event) => do_meetview(event, notification['id'])}>VIEW MEET DETAILS</button>
                                            </div>
                                            : ""}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

const FREN_ACCEPT = gql`
    mutation frenaccept($user_id: String!, $fren_id: String!) {
        frenaccept(user_id: $user_id, fren_id: $fren_id)
    }
`;

const FREN_REJECT = gql`
    mutation frenreject($user_id: String!, $fren_id: String!) {
        frenreject(user_id: $user_id, fren_id: $fren_id)
    }
`;

const FETCH_MEET = gql`
    query($user_id: String!, $fren_id: String!){
        meetDisp(user: $user_id, other: $fren_id){
		id people type date time duration link msg place notif
        }
    }
`

const FETCH_MEETDETS = gql`
    query($notifid: String!){
        schedMeet(notifid: $notifid){
		id people type date time duration link msg place notif
        }
    }
`

const MEET_EDIT = gql`
    mutation meetEdit(
	    $sender: String!
	    $sendee: String!
	    $type: String!
	    $date: String!
	    $time: String!
	    $duration: Int
	    $link: String
	    $msg: String
	    $place: String
	    $notif: Boolean!
    ) {
	    meetEdit(
		    data: {
			    sender: $sender
			    sendee: $sendee
			    type: $type
			    date: $date
			    time: $time
			    duration: $duration
			    link: $link
			    msg: $msg
			    place: $place
			    notif: $notif
		    }
	    )
    }
`;

const MEET_ACCEPT = gql`
    mutation meetaccept($user_id: String!, $fren_id: String!) {
        meetaccept(user_id: $user_id, fren_id: $fren_id)
    }
`;

const MEET_REJECT = gql`
    mutation meetreject($user_id: String!, $fren_id: String!) {
        meetreject(user_id: $user_id, fren_id: $fren_id)
    }
`;

const FETCH_NOTIFICATIONS_QUERY = gql`
    query($user_id: String!){
        getNotif(id: $user_id){
            id userId email match type username
        }
    }
`
export default Notifications;
