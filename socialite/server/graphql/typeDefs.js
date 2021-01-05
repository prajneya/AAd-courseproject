const { gql } = require('apollo-server');
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');

module.exports = gql`
    
    scalar JSONObject

    type Post{
        id: ID!
        title: String!
        body: String!
        email: String!
        createdAt: String!
        answers: [Answer]
        upvotes: [Upvote]
        downvotes: [Downvote]
        tags: JSONObject
    }
    type Blog{
        id: ID!
        title: String!
        body: String!
        email: String!
        createdAt: String!
        comments: [Answer]
        likes: [Upvote]
        tags: JSONObject
    }
    type Tag{
        id: ID!
        name: String!
        weekly: Int!
        lifetime: Int!
    }
    type searchPost{
        _id: ID!
        title: String!
        body: String!
        email: String!
        createdAt: String!
        answers: [Answer]
        upvotes: [Upvote]
        downvotes: [Downvote]
        tags: JSONObject
    }
    type searchUser{
        _id: ID!
        username: String!
        email: String!
    }
    type Upvote{
        id: ID
        email: String
        createdAt: String
    }
    type Downvote{
        id: ID
        email: String
        createdAt: String
    }
    type Answer{
        id: ID
        body: String
        email: String
        upvotes: [Upvote]
        downvotes: [Downvote]
        createdAt: String
    }
    type Report{
        id: ID!
        postId: ID!
        answerId: ID
        body: String!
        email: String!
        createdAt: String!
    }
    type User{
    	id: ID!
        username: String!
    	email: String!
    	token: String!
    	createdAt: String!
        rating: Int!
        volatility: Float!
        times_answered: Int!
    }
    type field1{
        val: Int!
        flag: Int!
    }
    type field2{
        val: String!
        flag: Int!
    }
    type field3{
        val: [String]!
        flag: [Int]!
    }
    type Profile{
    	hosnum: field1
    	hosname: field2
    	house: field2
	batch: field2 
	stream: field2
    	sports: field3
    	clubs: field3
    	match: Float
        email: String!
	username: String!
        friend: Int!
	meet: Int!
    }
    type Recommend{
        id: ID!
        match: Float!
        email: String!
	    username: String!
	    meet: Int!
        imgUrl: String!
    }
    type Info{
	    id: ID!
	    username: String!
	    email: String!
    }
    input RegisterInput{
        username: String!
    	email: String!
    	password: String!
    	confirmPassword: String!
	batch: String!
	stream: String!
    }
    input ResendInput{
	    id: String!
	    email: String!
	    username: String!
	    time: String!
    }
    input MeetInput{
	    sender: String!
	    sendee: String!
	    type: String!
	    date: String!
	    time: String!
	    duration: Int
	    link: String
	    msg: String
	    place: String
	    notif: Boolean!
    }
    type Meet{
	    id: ID!
	    people: [String]!
	    type: String!
	    date: String!
	    time: String!
	    duration: String!
	    link: String!
	    msg: String!
	    place: String!
	    notif: Boolean!
    }
    type Notif{
	id: String!
        userId: String!
        match: Float!
        email: String!
	username: String!
        type: String!
	time: String!
    }
    input ProfileEdits{
    	user_id: String!
    	house: String
    	hosnum: Int
    	hosname: String
    	sports: [String]
    	clubs: [String]
    }
    type Query{
        getPosts: [Post]
        getPostsFiltered(filter: String): [searchPost]
        getTopPosts: [Post]
        getPost(postId: ID!): Post
        getTopRated: [User]
        getTopAnswered: [User]
        getTags: [Tag]
        getTopTags: JSONObject
        recommend(id: String!): [Recommend]!
        didIUpvoteQuestion(postId: ID!, email: String!): Boolean!
        didIDownvoteQuestion(postId: ID!, email: String!): Boolean!
        didIUpvoteAnswer(postId: ID!, email: String!): JSONObject
        didIDownvoteAnswer(postId: ID!, email: String!): JSONObject
        profile(curid: String!, id: String!): Profile!
        getNotif(id: String!): [Notif]!
        getSkills(email: String!): JSONObject
        getTimelineInfo(username: String!): JSONObject
        searchByTextPost(query: String!): [searchPost]
        searchForUsers(query: String!): [searchUser]
        getTimelineData: JSONObject
        getUserTimelineData(id: ID) : JSONObject
        getUserBlogs(email: String): [Blog]
        getUserImage(id: ID): String
        getBlog(blogId: ID!): Blog
        getBlogs: [Blog]
	   friendList(id: ID!): [Info]!
	   meetDisp(user: String!, other: String!): Meet! 
	   schedMeet(notifid: String!): Meet! 
	   allMeets(user: String!): [Meet]! 
       getPotentialBadges: [String]
       getBadge: String
       getBadgeById(id: String!): String
    }
    type Mutation{
        insertTag(name: String!): Tag!
        updateTag(tagname: String!): Tag!
    	register(registerInput: RegisterInput): User!
        verify(tok: String!): User!
    	login(credential: String!, password: String!): User!
        createPost(title: String!, body: String!, tags: JSONObject): Post!
        createBlog(title: String!, body: String!, tags: JSONObject): Blog!
        deletePost(postId: ID!): String!
        deleteAnswer(postId:ID!, answerId: ID!): String!
        deleteBlog(blogId: ID!): String!
        addAnswer(postId: ID!, body: String!): Post!
        addComment(blogId: ID!, body: String!): Blog!
        deleteComment(blogId: ID!, commentId: ID!): Blog!
        upvoteQuestion(postId: ID!, email: String!): Post!
        upvoteAnswer(postId: ID!, answerId: ID!, email: String!): Post!
        downvoteQuestion(postId: ID!, email: String!): Post!
        downvoteAnswer(postId: ID!, answerId: ID!, email: String!): Post!
        removeUpvoteQuestion(postId: ID!, email: String!): Post!
        removeUpvoteAnswer(postId: ID!, answerId: ID!, email: String!): Post!
        removeDownvoteQuestion(postId: ID!, email: String!): Post!
        removeDownvoteAnswer(postId: ID!, answerId: ID!, email: String!): Post!
        frenaccept(user_id: String!, fren_id: String!): ID
        frenreject(user_id: String!, fren_id: String!): ID
        frenrequest(user_id: String!, fren_id: String!): ID
	subsave(id: String!, sub: String!): ID
        meetaccept(user_id: String!, fren_id: String!): ID
        meetreject(user_id: String!, fren_id: String!): ID
        meetrequest(data: MeetInput!): ID
        meetEdit(data: MeetInput!): ID
        edit(input: ProfileEdits): ID
        uploadPhoto(photo: Upload!): String
        updateProfile(name: String, username: String, fblink: String, ghlink: String, about: String, house: String, clubs: JSONObject, hostel: String, sports: JSONObject, pOneTitle: String, pOneGhLink: String, pOneELink: String, pOneDesc: String, pTwoTitle: String, pTwoGhLink: String, pTwoELink: String, pTwoDesc: String, pThreeTitle: String, pThreeGhLink: String, pThreeELink: String, pThreeDesc: String, roomNo: Int): String
        resend(data: ResendInput!): Int!
        forgotPass(email: String!): String
        passChange(token: String!, password: String!, confirmPassword: String!): Int
	dbFix(random: String): String
        addBadge(display: String): String!
        removeBadge: String!
    } 
`;

const resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
};
