from rest_framework.views import APIView
from .serializers import UserSerialiser
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import User
import jwt, datetime

# Create your views here.

class RegisterViews(APIView):
    def post(self, request):
        serializer = UserSerialiser(data = request.data)
        serializer.is_valid(raise_exception = True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email='{}'.format(email)).first()

    #ici on verifi si l'utilisateur existe
        if user is None:
            raise AuthenticationFailed('User not found!')

        #on compare les mots de passe 
        if not user.check_password(password):
            raise AuthenticationFailed('le mot de passe est incorrect!')
        

        payload ={
            'id': user.id,
            'exp':datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat':datetime.datetime.utcnow()
        }

        token = jwt.encode(payload,'secret', algorithm='HS256').decode('utf-8')
        
        return Response({
            'jwt':token
        })