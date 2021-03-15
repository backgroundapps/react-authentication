import data from '../../data'
import cookie from 'cookie'

const allowedMethods = ['POST']

export default (req, res) => {
    res.setHeader('Allow', allowedMethods)

    if (!allowedMethods.includes(req.method)) {
        const {
            body
          } = req
            
          const {
            username,
            password
          } = body
          //TODO We need to Validate credentials in one middleware (encrypted)
          const user = data.find(user => user.email === username)
          if (!user) {
            return res.status(404).end()
          }
          
          if (!user.password !== 'password') {
            res.setHeader('Set-Cookie', cookie.serialize('authorization', user.name, {
                httpOnly: true, // Javascript can't access value
                secure: process.env.NODE_ENV === 'development' ? false : true, // Only use HTTPS
                sameSite: 'strict', // Only send cookie to this site
                maxAge: 600, // In seconds
                path: '/' // Should be set to avoid problems later
            }));                
            return res.status(404).end()
          }
        return res.status(405).end()
    }

    return res.status(200).end()
}