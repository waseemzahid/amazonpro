import Container from '@/components/Container'
import ProfileInfo from '@/components/ProfileInfo'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';

const ProfilePage = async() => {
    const session = await getServerSession();

    if(!session || !session.user){
        redirect("/");
    }
  return (
    <Container>
        <p className="text-2xl pb-10 text-designColor font-bold">
        Profile Information
      </p>
      <ProfileInfo />
    </Container>
  )
}

export default ProfilePage