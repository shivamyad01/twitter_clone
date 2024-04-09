import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAllTweets } from "../redux/tweetSlice";
import { TWEET_API_END_POINT } from "../utils/constant";

const useGetMyTweets = (id) => {
    const dispatch = useDispatch();
    const { refresh } = useSelector(store => store.tweets);

    useEffect(() => {
        const fetchMyTweets = async () => {
            try {
                const res = await axios.get(`${TWEET_API_END_POINT}/getalltweet/${id}`, {
                    withCredentials: true
                });

                dispatch(getAllTweets(res.data.tweets));
            } catch (error) {
                console.log(error);
            }
        };

        fetchMyTweets();

    }, [refresh]);

};

export default useGetMyTweets;
