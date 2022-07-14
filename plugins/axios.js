export default function({ $axios, $auth }) {

    $axios.setHeader('Content-Type', 'application/json');
    $axios.setToken($auth.strategy.token.get());
}
