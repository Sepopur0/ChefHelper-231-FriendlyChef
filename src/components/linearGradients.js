import { LinearGradient } from 'expo-linear-gradient';
import { colorPalette } from '../utils/systemDesign';
const appBackground=<LinearGradient
    colors={['#394548', '#31383d', '#292c30', '#212023', '#171517', '#171517', '#171517', '#171517', '#212023', '#292c30', '#31383d', '#394548']}
    start={{x:1,y:1}}
    end={{x:0,y:0}}
    style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height:'100%'
    }}
/>

const LoginRegisterBackGround=<LinearGradient
colors={[colorPalette.color11,colorPalette.color5,'#F9F9F9']}
start={{x:0,y:0.6}}
end={{x:1.4,y:0.2}}
locations={[0,0.1,0.3]}
style={{
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
}}
/>

export {appBackground,LoginRegisterBackGround}