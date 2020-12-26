import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Parser from 'html-react-parser';
import { faSearch, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./StackOverflow.css"
import Sidebar from "../Sidebar"

function StackOverflow(props){

  function showIssue(postId){
    props.history.push('/issue/'+postId);
  }

  function createPost(){
    props.history.push('createpost');
  }

  function searchCallback(){
    var query = document.getElementById("search_query").value;
    if(query===""){
      return;
    }
    props.history.push({
      pathname: "/search",
      state: { query: query },
    });
  }

  const [filter, setFilter] = useState("newest");
  const [post_list, setPostList] = useState([]);
  const [firstCheck, setFirstCheck] = useState(true)
  
  const { data: people } = useQuery(FETCH_PEOPLE_QUERY);

  var people_list = people ? people.getTopAnswered : "";

  const { data: trending_tags } = useQuery(FETCH_TAGS);

  var trending_tags_list = trending_tags ? trending_tags.getTopTags : "";

  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  const [filterData, { data: filter_data }] = useLazyQuery(FETCH_FILTERED_POSTS_QUERY, {
      onCompleted(){
        setPostList(filter_data.getPostsFiltered);
      },
      variables: {
        filter
      }
  });

  if(!loading && firstCheck){
    setFirstCheck(false);
    setPostList(data.getPosts);
  }

  async function setPostChangeData(){
    await setFilter(document.getElementById("filterBy").value);
  }

  function changePosts(){
    setPostChangeData();
    filterData();
  }

	return (
            <>
              <Sidebar/>
              <main className="s-layout__content">
                <div className="create-post-button" onClick={createPost}><span className="create-post-icon"><i><FontAwesomeIcon icon={faEdit} size="xs"/></i></span></div>

            		<div className="container-fluid">

                  <div className="explore-posts pr-3 my-5">
                    <form className="searchbox">
                      <input type="text" id="search_query" placeholder="Search Questions" autoComplete="off"/>
                      <button className="rounded m-2 search-button float-right my-4" onClick={searchCallback}><i><FontAwesomeIcon icon={faSearch} /></i></button>
                    </form>
                    <br/> <br/> <br/> 
                    <div className="trending-tags desktop-only">
                      <div className="explore-subheader mt-4">Trending:</div>
                      {trending_tags_list && trending_tags_list.map(trending_tag => ( 
                      <div className="tag px-3 py-2 mr-1 mt-1">#{trending_tag['name']}</div>
                      ))}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-9">
                      <div className="explore-posts">
                        <div className="trending-tags text-right">
                          <div className="explore-subheader mb-4">Sort By:</div>
                          <select id="filterBy" onChange={changePosts}>
                            <option value="newest">Newest</option>
                            <option value="active">Active</option>
                            <option value="unanswered">Unanswered</option>
                          </select>
                        </div>
                        <div className="posts-list">
                          {post_list && post_list.map(post => ( 
                            <div className="single-post p-3 my-2" onClick={() => showIssue(post['id'] ? post['id'] : post['_id'])}>
                              <div className="post">
                                <div className="post-body">
                                  <div className="post-header">{post['title']}</div>
                                  <div className="post-content mt-4">{post ? Parser(post['body']) : ""}</div>
                                </div>
                              </div>
                              <hr/>
                              <div className="question-info mt-4">
                                <div className="tags d-inline-block text-left">
                                  {post.tags && Object.keys(post.tags).map(tag => ( 
                                  <div className="tag px-3 py-2 mr-1 my-1">#{tag}</div>
                                  ))}
                                </div>
                                <div className="info-details text-right">
                                  <div className="small-upvote-count d-inline-block mr-2 px-2 py-1">{post['answers'].length} answers</div>
                                </div>
                              </div>
                            </div>
                          ))} 
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 right-sidebar desktop-only">
                      <div className="text-center">
                        <button className="my-1 create-post w-100 py-3" onClick={createPost}>ASK QUERY + </button>
                      </div>
                      <div className="my-3 p-2 top-users-post">
                        <div className="card-header">
                          TOP USERS
                        </div>
                        <div className="top-users m-4">
                          <ul>
                          {people_list && people_list.map(person => ( 
                            <li className="mt-4">{person['username']}
                              <div className="no-post float-right">{person['times_answered']} answers</div>
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

const FETCH_POSTS_QUERY = gql`
    query{
        getPosts{
            id title body email answers{ id } upvotes{ id } tags
        }
    }
`

const FETCH_FILTERED_POSTS_QUERY = gql`
    query($filter: String!){
        getPostsFiltered(filter: $filter){
            _id title body answers{ id } tags
        }
    }
`

const FETCH_PEOPLE_QUERY = gql`
    query{
        getTopAnswered{
            username times_answered
        }
    }
`

const FETCH_TAGS = gql`
    query{
        getTopTags
    }
`

export default StackOverflow;
