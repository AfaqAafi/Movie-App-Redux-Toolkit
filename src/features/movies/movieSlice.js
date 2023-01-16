import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { ApiKey } from "../../common/apis/MovieApiKey";

const movieText = "Harry";
const seriesText = "Friends";

export const fetchMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const response = await movieApi
      .get(`?apikey=${ApiKey}&s=${movieText}&type=movie`)
      .catch((err) => console.log("Error :", err));
    return response.data;
  }
);
export const fetchShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async () => {
    const response = await movieApi
      .get(`?apikey=${ApiKey}&s=${seriesText}&type=series`)
      .catch((err) => console.log("Error :", err));
    return response.data;
  }
);
export const fetchMovieShowsDetails = createAsyncThunk(
  "movies/fetchMovieShowsDetails",
  async (id) => {
    const response = await movieApi.get(`?apikey=${ApiKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      console.log("Pending");
    });
    builder.addCase(fetchMovies.fulfilled, (state, { payload }) => {
      return { ...state, movies: payload };
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      const { payload } = action;
      return { ...state, movies: payload };
    });
    builder.addCase(fetchShows.fulfilled, (state, { payload }) => {
      return { ...state, shows: payload };
    });
    builder.addCase(fetchMovieShowsDetails.fulfilled, (state, { payload }) => {
      return { ...state, selectMovieOrShow: payload };
    });
  },
});

export default movieSlice.reducer;
export const { addMovies, removeSelectedShow } = movieSlice.actions;
