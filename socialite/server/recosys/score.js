const data = require("../util/userdata");
const content = require("./content");

const ex = require("express");
users = [];
mapping = {};

function custom(x) {
	return function(a, b) {
		if (a[x] <= b[x]) {
			return 1;
		} else if (a[x] > b[x]) {
			return -1;
		}
		return 0;
	}
}

async function friendlist(id, flag)
{
	users = await data.getProfiles();
	for(i = 0; i < users.length; ++i)
		mapping[users[i]._id] = i;
	marked = Array(users.length).fill(0);

	const cur = await data.getProfileById(id);
	send = Array(cur.friends.length);
	for(i = 0; i < cur.friends.length; ++i)
	{
		send[i] = users[mapping[cur.friends[i]]];
		marked[mapping[cur.friends[i]]] = 1;
	}

	l = -1;
	score = Array(users.length - 1 - cur.friends.length).fill({});
	for(i = 0; i < users.length; ++i)
	{
		var sval = 0;
		if(mapping[id] == i || marked[i] == 1)
			continue;

		email =  await data.getUserEmail(users[i]._id);
		if(cur.cluster_no == users[i].cluster_no)
			sval = 0.5;

		conscore = await content.scoring(cur, users[i], send);
		sval += (0.5 * conscore);
		if(sval == 0)
			continue;

		score[++l] = {"id": users[i]._id, "match": sval, "email": email};
		score[l].match *= 100;
	}

	score.sort(custom("match"));
	return score;
}

module.exports = async function recomain(id) {
	ret = await friendlist(id, 0);
	return ret;
}
