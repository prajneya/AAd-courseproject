import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import gql from 'graphql-tag';
import Swal from 'sweetalert2';
import moment from "moment-timezone"
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AuthContext } from '../../context/auth'

import "./Timeline.css"
import Sidebar from "../Sidebar";

function Timeline(props){

  const { user } = useContext(AuthContext)

  const curid = user.id;
  const [fren_id, setfren_id] = useState('');
  const [values, setValues] = useState({});
  
  const [frenrequest] = useMutation(FREN_REQUEST, {
    update(_, { data: { login: userData } }){
      window.location.reload(false);
    },
        onError(err){
          if(err.graphQLErrors.length > 0)
            Swal.fire({title: "Our pigeon got lost somewhere.",
                  html: Object.values(err.graphQLErrors[0])[0],
                  footer: "The above error popped up while sending the friend request.",
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
	    user_id: curid,
	    fren_id: fren_id
    }
})

const [meetrequest] = useMutation(MEET_REQUEST, {
    update(_, { data: { login: userData } }){
      window.location.reload(false);
    },
        onError(err){
          if(err.graphQLErrors.length > 0)
            Swal.fire({title: "The Mafia hijacked our convoy.",
                  html: Object.values(err.graphQLErrors[0])[0],
                  footer: "The above error popped up while sending the meet request.",
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
	  user_id: curid,
	  fren_id: fren_id
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
	  user_id: curid,
	  fren_id: fren_id
  }
})

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
	  user_id: curid,
	  fren_id: fren_id
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
	  user_id: curid,
	  fren_id: fren_id
  }
})

async function send_frenrequest(fren_id){
	document.getElementById("freq").disabled = true
  await setfren_id(fren_id);
  frenrequest();
}

async function send_meetrequest(fren_id){
	await setfren_id(fren_id);
	await Swal.fire({
		title: 'Meet Details',
		html: `
			    <label class="d-inline-block text-warning" for="type">Type:<span class="text-danger">*</span></label>
				<input type="radio" id="online" name="option" value="online">
    			<label for="online">Online</label>
    			<input type="radio" id="offline" name="option" value="offline">
    			<label for="offline">Offline</label><br><br>
			    <div class="textfield">
				<label class="d-inline-block text-warning" for="date">Date:<span class="text-danger">*</span></label>
				<input class="d-inline-block" type="date" id="date" name="date" placeholder="dd-mm-yyyy" min="" onChange={onChange} />
			    </div><br>
			    <div class="textfield">
				<label class="text-warning" for="time">Time (IST):<span class="text-danger">*</span></label>
				<input type="time" id="time" name="time" placeholder="Enter meet time" onChange={onChange} />
			    </div><br>
			    <div class="textfield">
				<label class="text-warning" for="duration">Duration(in minutes):</label>
				<input type="number" id="duration" name="duration" placeholder="Enter meet duration" onChange={onChange} />
			    </div><br>
			    <div class="textfield">
				<label class="text-warning" for="msg">Message:</label>
				<textarea type="text" id="msg" name="msg" placeholder="Craft a beautiful message. Maybe drop your Instagram ID first? No one likes a creep." onChange={onChange}></textarea>
			    </div><br>
			    <div class="textfield">
				<label class="text-warning" for="link">Link:</label>
				<input type="text" id="link" name="link" placeholder="Enter meet link" onChange={onChange} />
			    </div><br>
			    <div class="textfield">
				<label class="text-warning" for="place">Place:</label>
				<input type="text" id="place" name="place" placeholder="Enter meet location" onChange={onChange} />
			    </div><br>
			    <div class="notif">
				<label class="text-warning" for="notif">Reminder:<span class="text-danger">*</span></label>
				<input type="radio" id="reminder_yes" name="options" value=true><label for="reminder_yes">Yes</label>
				<input type="radio" id="reminder_no" name="options" value=false><label for="reminder_no">No</label>
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
		values.sender = curid
		values.sendee = fren_id
		values.type = result.value.type
		values.date = result.value.date
		values.time = result.value.time
		values.duration = result.value.duration
		values.link = result.value.link
		values.msg = result.value.msg
		values.place = result.value.place
		values.notif = result.value.notif
		meetrequest()
	})
}

async function do_frenaccept(fren_id){
	document.getElementById("facc").disabled = true
  await setfren_id(fren_id);
  frenaccept();
}

async function do_frenreject(fren_id){
	document.getElementById("frej").disabled = true
  await setfren_id(fren_id);
  frenreject();
}

async function do_meetaccept(fren_id){
	document.getElementById("macc").disabled = true
  await setfren_id(fren_id);
  meetaccept();
}

async function do_meetreject(fren_id){
	document.getElementById("mrej").disabled = true
  await setfren_id(fren_id);
  meetreject();
}

const username = props.match.params.username;

  const { data: timelineData } = useQuery(FETCH_TIMELINE, {
        variables: {
            username: username
        }
  });

  var timeline_data = timelineData ? timelineData.getTimelineInfo : "";
  var id = timelineData ? timeline_data.id : "";

  const { data: profileData } = useQuery(FETCH_PROFILE, {
    variables: {
        curid: curid,
        id: id
    }
  });

  var profile_data = profileData ? profileData.profile : "";

  const { data: userTimelineData } = useQuery(FETCH_USER_TIMELINE, {
    variables: {
      id: timeline_data.id
    }
  });
  var user_timeline_data = userTimelineData ? userTimelineData.getUserTimelineData : "";

  const { data: blogData } = useQuery(FETCH_BLOGS, {
        variables: {
            email: timeline_data.email
        }
  });
  var blog_data = blogData ? blogData.getUserBlogs : "";

  function showBlog(blogId){
    props.history.push('/blog/'+blogId);
  }

  const { data: people } = useQuery(FETCH_PEOPLE_QUERY, {
    variables: {
      id: timeline_data.id
    }
  });

  var people_list = people ? people.friendList : "";

  const { data: displayBadgeData } = useQuery(FETCH_DISPLAY_BADGE, {
    variables: {
      id: id
    }
  });
  var badge_data = displayBadgeData ? displayBadgeData.getBadgeById : "";

  const [firstCheck, setFirstCheck] = useState(true);

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
			values.sender = curid
			values.sendee = id
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
			user: curid,
			other: id
		} 
	});

async function do_meetedit(){
	if(firstCheck){
		await setFirstCheck(false);
		loadMeet();
	}
	else{
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
			values.sender = curid
			values.sendee = id
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
	}
}

  if(!timeline_data){
    return (<>USER NOT FOUND</>)
  }

  return (
            <>
              <Sidebar/>
              <main class="s-layout__content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xl-9">
                      <div className="display text-center my-5">
                        <div className="mx-2 username">{username}</div><br/><br/><div className="rating mt-1 mx-2 p-2">RATING: {timeline_data ? timeline_data.rating : ""}</div>
                        <div className="times-answered mt-1 mx-2 p-2">CONTRIBUTION: <strong>{timeline_data ? timeline_data.contributions : ""}</strong></div>                        
                        {badge_data !== "NoBadge" ? <div className="times-answered bg-danger mt-1 mx-2 p-2"><strong>{badge_data}</strong></div> : "" } 
                        <br/><br/>
                        <div className="about-me mx-2 my-5">
                          <div className="row">
                            <div className="col-xl-12">
                              <div className="profile-picture">
                                {timeline_data.imgUrl === "" ? <img src='/img/dp.jpeg' alt="display"/> : <img src={timeline_data.imgUrl} alt="display"/> }
                              </div>
                                <hr className="picture-seprator"/>
                            </div>
                            <div className="col-xl-12 about-me-text">
                              {user_timeline_data['bio']}
                              <div className="email mx-2">{timeline_data ? timeline_data.email : ""}</div>
                              <div className="social-links">
                                {user_timeline_data['fblink'] ? <a href={user_timeline_data['fblink']} target="_blank" rel="noreferrer"><i><FontAwesomeIcon icon={faFacebook} size="2x"/></i></a> : ""}
                                {user_timeline_data['ghlink'] ? <a href={user_timeline_data['ghlink']} target="_blank" rel="noreferrer"><i><FontAwesomeIcon icon={faGithub} size="2x"/></i></a> : ""}                                
                              </div>
                              <div className="text-center">
                                {profile_data.friend === 0 ? 
                                  <button id="freq" className="rounded ml-2 my-2" onClick={() => send_frenrequest(timeline_data.id)}>SEND A FRIEND REQUEST</button>
                                  : ""}
                                  {profile_data.friend === 1 ? 
                                  <div>You're Friends!</div>
                                  : ""}
                                  {profile_data.friend === 2 ? 
                                  <div>Pending Friend Request!</div>
                                  : ""}
                                  {profile_data.friend === 3 ?
                                  <div>
                                  <button id="facc" className="rounded ml-2 my-2" onClick={() => do_frenaccept(timeline_data.id)}>ACCEPT FRIEND REQUEST</button>
                                  <button id="frej" className="rounded ml-2 my-2" onClick={() => do_frenreject(timeline_data.id)}>IGNORE FRIEND REQUEST</button>
                                  </div>
                                  : ""}

                                  {profile_data.meet === 0 ? 
                                  <button id="mreq" className="rounded ml-2 my-2" onClick={() => send_meetrequest(timeline_data.id)}>MEET UP</button>
                                  : ""}
                                  {profile_data.meet === 2 ? 
                                  <div>Pending Meet Request!</div>
                                  : ""}
                                  {profile_data.meet === 3 ? 
                                  <div>
                                  <button id="medit" className="rounded ml-2 my-2" onClick={() => do_meetedit()}>EDIT MEET DETAILS</button>
                                  <button id="macc" className="rounded ml-2 my-2" onClick={() => do_meetaccept(timeline_data.id)}>ACCEPT MEET UP</button>
                                  <button id="mrej" className="rounded ml-2 my-2" onClick={() => do_meetreject(timeline_data.id)}>IGNORE MEET UP</button>
                                  </div>
                                  : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                  
                      {/* <div className="container-fluid my-2">
                        <div className="showcase desktop-only">
                          <div className="showcase-header">
                            USER SHOWCASE
                          </div>
                          <br/>
                          <hr/>
                          <div className="showcase-top-skills">
                            <div className="row">
                              <div className="col-lg-3 mt-2">
                                <div className="top-skill">
                                  <div className="top-skill-icon">
                                    <img src='/img/badge1.png' alt=""></img>
                                  </div>
                                  <div className="top-skill-name">
                                    CHALLENGER
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-3 mt-2">
                                <div className="top-skill">
                                  <div className="top-skill-icon">
                                    <img src='/img/badge2.png' alt=""></img>
                                  </div>
                                  <div className="top-skill-name">
                                    CHALLENGER
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-3 mt-2">
                                <div className="top-skill">
                                  <div className="top-skill-icon">
                                    <img src='/img/badge3.png' alt=""></img>
                                  </div>
                                  <div className="top-skill-name">
                                    CHALLENGER
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-3 mt-2">
                                <div className="top-skill">
                                  <div className="top-skill-icon">
                                    <img src='/img/badge4.png' alt=""></img>
                                  </div>
                                  <div className="top-skill-name">
                                    CHALLENGER
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}

                      <div className="container-fluid my-5">
                        <div className="showcase">
                          <div className="showcase-header">
                            PROJECTS AND EXPERIENCES
                          </div>
                          <br/>
                          <hr/>
                          <div className="showcase-projects">
                            {user_timeline_data['pOneTitle'] && user_timeline_data['pOneTitle'].trim() !== "" && user_timeline_data['pOneDesc'].trim() !== "" ?
                            <>
                            <div className="project-container mt-3 pb-5">
                              <div className="project-header">
                                <div className="float-left mt-5 ml-5"><i><FontAwesomeIcon icon={faFolderOpen} size="2x"/></i></div>
                                <div className="float-right m-5">
                                  {user_timeline_data['pOneGhLink'] ? <a href={user_timeline_data['pOneGhLink']} target="_blank" rel="noreferrer"><i><FontAwesomeIcon icon={faGithub} size="2x"/></i></a> : "" }
                                  {user_timeline_data['pOneELink'] ? <a href={user_timeline_data['pOneELink']} target="_blank" rel="noreferrer"><i><FontAwesomeIcon icon={faExternalLinkAlt} size="2x"/></i></a> : "" }
                                </div>
                              </div>
                              <div className="project-title ml-5">
                                {user_timeline_data['pOneTitle']}
                              </div>
                              <div className="project-body mx-5 mt-3">
                                {user_timeline_data['pOneDesc']}
                              </div>
                              {/*<div className="tags d-inline-block mx-5 mt-5">
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                              </div> */} 
                            </div> 
                            </>
                            : "" }
                            {user_timeline_data['pTwoTitle'] && user_timeline_data['pTwoTitle'].trim() !== "" && user_timeline_data['pTwoDesc'].trim() !== "" ?
                            <>
                            <div className="project-container mt-3 pb-5">
                              <div className="project-header">
                                <div className="float-left mt-5 ml-5"><i><FontAwesomeIcon icon={faFolderOpen} size="2x"/></i></div>
                                <div className="float-right m-5">
                                  {user_timeline_data['pTwoGhLink'] ? <a href={user_timeline_data['pTwoGhLink']} target="_blank" rel="noreferrer"><i><FontAwesomeIcon icon={faGithub} size="2x"/></i></a> : "" }
                                  {user_timeline_data['pTwoELink'] ? <a href={user_timeline_data['pTwoELink']} target="_blank" rel="noreferrer"><i><FontAwesomeIcon icon={faExternalLinkAlt} size="2x"/></i></a> : "" }
                                </div>
                              </div>
                              <div className="project-title ml-5">
                                {user_timeline_data['pTwoTitle']}
                              </div>
                              <div className="project-body mx-5 mt-3">
                                {user_timeline_data['pTwoDesc']}
                              </div>
                              {/*<div className="tags d-inline-block mx-5 mt-5">
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                              </div> */} 
                            </div> 
                            </>
                            : "" }
                            {user_timeline_data['pThreeTitle'] && user_timeline_data['pThreeTitle'].trim() !== "" && user_timeline_data['pThreeDesc'].trim() !== "" ?
                            <>
                            <div className="project-container mt-3 pb-5">
                              <div className="project-header">
                                <div className="float-left mt-5 ml-5"><i><FontAwesomeIcon icon={faFolderOpen} size="2x"/></i></div>
                                <div className="float-right m-5">
                                  {user_timeline_data['pThreeGhLink'] ? <a href={user_timeline_data['pThreeGhLink']} target="_blank" rel="noreferrer"><i><FontAwesomeIcon icon={faGithub} size="2x"/></i></a> : "" }
                                  {user_timeline_data['pThreeELink'] ? <a href={user_timeline_data['pThreeELink']} target="_blank" rel="noreferrer"><i><FontAwesomeIcon icon={faExternalLinkAlt} size="2x"/></i></a> : "" }
                                </div>
                              </div>
                              <div className="project-title ml-5">
                                {user_timeline_data['pThreeTitle']}
                              </div>
                              <div className="project-body mx-5 mt-3">
                                {user_timeline_data['pThreeDesc']}
                              </div>
                              {/*<div className="tags d-inline-block mx-5 mt-5">
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                                <div className="tag px-3 py-2 mr-1 my-1">#tag</div>
                              </div> */} 
                            </div> 
                            </>
                            : "" }
                            {user_timeline_data['pOneTitle'] && user_timeline_data['pOneTitle'].trim() === "" && user_timeline_data['pOneDesc'].trim() === "" && user_timeline_data['pTwoTitle'] && user_timeline_data['pTwoTitle'].trim() === "" && user_timeline_data['pTwoDesc'].trim() === "" && user_timeline_data['pThreeTitle'] && user_timeline_data['pThreeTitle'].trim() === "" && user_timeline_data['pThreeDesc'].trim() === "" ? <div className="text-center">{username} has not yet added their projects or experiences.</div> : "" }
                            {!user_timeline_data['pOneTitle'] && !user_timeline_data['pTwoTitle'] && !user_timeline_data['pThreeTitle'] ? <div className="text-center">{username} has not yet added their projects or experiences.</div> : "" }
                          </div>
                        </div>
                      </div>

                      <div className="container-fluid my-2">
                        <div className="showcase">
                          <div className="showcase-header">
                            BLOGS
                          </div>
                          <br/>
                          <hr/>

                          {blog_data.length === 0 ? <div className="text-center">{username} has not yet posted any blogs.</div> : ""}

                          {blog_data && blog_data.map(blog => ( 
                          <div className="project-container mt-3 pb-5 hover-pointer" onClick={() => showBlog(blog['id'])}>
                              <div className="project-header">
                                <div className="float-left mt-5 ml-5"><i><FontAwesomeIcon icon={faNewspaper} size="2x"/></i></div>
                              </div>
                              <div className="project-title ml-5">
                                {blog['title']}
                              </div>
                              <div className="tags d-inline-block mx-5 mt-5">
                                  {blog.tags && Object.keys(blog.tags).map(tag => ( 
                                    <div className="tag px-3 py-2 mr-1 my-1">#{tag}</div>
                                  ))}
                              </div>
                          </div> 
                          ))}
                        </div>
                      </div>

                    </div>

                    <div className="col-xl-3 right-sidebar">
                      <div className="gratitude-point-list">
                        <div className="my-3 p-2 top-users-post">
                          <div className="card-header">
                            GRATITUDE POINTS
                          </div>
                          <div className="top-users m-4">
                            <ul>
                              {timeline_data.skills && Object.keys(timeline_data.skills).map(skill => (
                      timeline_data.skills[skill] > 0 ?
                              <li className="mt-4">{skill}
                                <div className="no-post float-right">{parseInt(timeline_data.skills[skill])}</div>
                              </li>: ""
                                ))}
                            </ul>
                            {Object.keys(timeline_data.skills).length > 0 ? "" : <div className="text-center">{username} has not accumulated any gratitude points.</div> }
                          </div>
                        </div>
                      </div>
                      <div className="my-3 p-2 top-users-post">
                        <div className="card-header">
                          {username}'s FRIENDS
                        </div>
                        <div className="top-users m-4">
                          {people_list.length > 0 ? "" : <div className="text-center">{username} does not have any friends so far.</div> }
                          <ul>
                            {people_list && people_list.map(person => ( 
                            <li className="mt-4"><a href={"/profile/"+person['username']}>{person['username']}</a>
                            </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
              </main>
            </>
      )
    
}

const FETCH_DISPLAY_BADGE = gql`
    query($id: String!){
        getBadgeById(id: $id)
    }
`;

const FREN_REQUEST = gql`
    mutation frenrequest($user_id: String!, $fren_id: String!) {
        frenrequest(user_id: $user_id, fren_id: $fren_id)
    }
`;

const MEET_REQUEST = gql`
    mutation meetrequest(
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
	    meetrequest(
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
    query($user: String!, $other: String!){
        meetDisp(user: $user, other: $other){
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

const FETCH_TIMELINE = gql`
    query($username: String!){
        getTimelineInfo(username: $username)
    }
`;

const FETCH_PROFILE = gql`
    query($curid: String!, $id: String!){
        profile(curid: $curid, id: $id){
            friend meet
        }
    }
`;

const FETCH_USER_TIMELINE = gql`
    query($id: ID){
        getUserTimelineData(id: $id)
    }
`;

const FETCH_BLOGS = gql`
    query($email: String){
        getUserBlogs(email: $email){
          id
          title
          tags
        }
    }
`;

const FETCH_PEOPLE_QUERY = gql`
    query($id: ID!){
        friendList(id: $id){
          username
        }
    }
`

export default Timeline;
