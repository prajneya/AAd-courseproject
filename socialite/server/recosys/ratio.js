const ex = require("express");
const data = require("../util/userdata");

function check (a,b)
{
	if(a == b)
		return 1;
	else 
		return 0;
}

function checkhos (a,b)
{
	if(a < 100) //for obh ground floor
	{
		if(b < 100)
			return 1;
		else 
			return 0;
	}
	else // for non obh
	{
		x = (a/100)%100| 0 ; // for hundred's place 
		y = (b/100)%100| 0 ; // for hundred's place 
		z = check(x,y);
		return z;
	}
}

function isCheckhostel(a,b)
{
	if((typeof a !== 'undefined') && (typeof b !== 'undefined') && a != -1 && b != -1)
        return 1;
	else
		return 0;
}

function isCheck(a,b)
{
	if((typeof a !== 'undefined') && (typeof b !== 'undefined') && a != "" && b != "")
        return 1;
	else
		return 0;
}


async function updateratio(user, profile, arr)
{
	var total = arr.length; // this includes the new friend included 
	if(total <= 1)
	{
		var hosnum = 0;
		var hosname = 0;
		var house = 0;
		var batch = 0;
		var stream = 0;
		var sporarr = Array(user.sports.length).fill(0);
		var cluarr = Array(user.clubs.length).fill(0);
		var arr = [hosnum, hosname, house, sporarr , cluarr, batch, stream];
		await data.updateDets(user.id, arr);
	}
	const cur = await data.getUserDetsById(user._id);
	if(isCheckhostel(profile.hosnum, user.hosnum))
	{
		var hosnum = ((cur.hosnum*(total-1)) + checkhos(profile.hosnum, user.hosnum))/total;
	}
	else
		var hosnum = (cur.hosnum*(total-1))/total;
	if(isCheck(profile.hosname, user.hosname))
	{
		var hosname = ((cur.hosname*(total-1)) + check(profile.hosname, user.hosname))/total;
	}
	else
		var hosname = (cur.hosname*(total-1))/total;
	if(isCheck(profile.house, user.house))
	{
		var house = ((cur.house*(total-1)) + check(profile.house, user.house))/total;
	}
	else
		var house = (cur.house*(total-1))/total;
	if(isCheck(profile.batch, user.batch))
	{
		var batch = ((cur.batch*(total-1)) + check(profile.batch, user.batch))/total;
	}
	else
		var batch = (cur.batch*(total-1))/total;
	if(isCheck(profile.stream, user.stream))
	{
		var stream = ((cur.stream*(total-1)) + check(profile.stream, user.stream))/total;
	}
	else
		var stream = (cur.stream*(total-1))/total;
	
	var sports = profile.sports;
	const sporlen = profile.sports.length;
	var spouser = user.sports;
	var spouserlen = user.sports.length;
	var sporarr = Array(spouserlen).fill(0);
	for(j = 0; j < spouserlen; ++j)
	{
		for(k = 0; k < sporlen; ++k)
		{
			if(isCheck(sports[j],spouser[k]))
			{
				sporarr[j]=check(sports[j],spouser[k]);	
				if(sporarr[j])
					break;
			}
		}
		sporarr[j] = ((cur.sports[j]*(total-1)) + sporarr[j])/total; 
	}

	var clubs = profile.clubs;
	const clulen = profile.clubs.length;
	var cluuser = user.clubs;
	var cluuserlen = user.clubs.length;
	var cluarr = Array(cluuserlen).fill(0);
	for(j = 0; j < cluuserlen; ++j)
	{
		for(k = 0; k < clulen; ++k)
		{
			if(isCheck(clubs[j],cluuser[k]))
			{
				cluarr[j]=check(clubs[j],cluuser[k]);	
				if(cluarr[j])
					break;
			}
	
		}
		cluarr[j] = ((cur.clubs[j]*(total-1)) +cluarr[j])/total; 
	}
	return [hosnum, hosname, house, sporarr, cluarr, batch, stream];
}

module.exports = { "updateratio":  updateratio };
