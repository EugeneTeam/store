export default () => ({
  JWT: {
    secret: process.env.JWT_SECRET_KEY,
    signOptions: {
      expiresIn: '60s',
    },
  },
  JwtSalt: 15
})
