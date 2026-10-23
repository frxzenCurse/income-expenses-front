export const DOMAIN = "http://localhost:8080"
export const API_DOMAIN = `${DOMAIN}/api`

// auth
export const LOGIN = `${API_DOMAIN}/auth/login`
export const LOGOUT = `${API_DOMAIN}/auth/logout`
export const REGISTER = `${API_DOMAIN}/auth/register`
export const REFRESH_TOKEN = `${API_DOMAIN}/auth/refresh`

// user
export const GET_USER = `${API_DOMAIN}/user/`

// categories
export const GET_CATEGORIES = `${API_DOMAIN}/category/`
export const UPDATE_CATEGORY = `${API_DOMAIN}/category/update`
export const CREATE_CATEGORY = `${API_DOMAIN}/category/create`
export const DELETE_CATEGORY = `${API_DOMAIN}/category/delete`

// categories
export const GET_TRANSACTIONS = `${API_DOMAIN}/transaction/`
export const UPDATE_TRANSACTION = `${API_DOMAIN}/transaction/update`
export const CREATE_TRANSACTION = `${API_DOMAIN}/transaction/create`
export const DELETE_TRANSACTION = `${API_DOMAIN}/transaction/delete`