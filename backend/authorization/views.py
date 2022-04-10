from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from authorization.serializers import ProfileSerializer, LoginSerializer, AuthenticationCodeSerializer, RegisterSerializer
from authorization.models import AuthenticationCode, User
from . import authentication
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token


class Profile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class Login(APIView):
    permission_classes = [~IsAuthenticated]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.data['username']
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                return Response({}, status=status.HTTP_404_NOT_FOUND)
            if user.is_active:
                authentication_code = authentication.generate_code()
                authentication.set_and_send_code(user, authentication_code)
                return Response({'user_id': user.id}, status=status.HTTP_200_OK)
            return Response({}, status=status.HTTP_403_FORBIDDEN)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        serializer = AuthenticationCodeSerializer(data=request.data)
        if serializer.is_valid():
            user_id = serializer.data['user_id']
            authentication_code = serializer.data['code']
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return Response({}, status=status.HTTP_404_NOT_FOUND)
            if authentication.check_code(user, authentication_code):
                token = Token.objects.get_or_create(user=user)[0]
                return Response({'token': token.key}, status=status.HTTP_200_OK)
            return Response({}, status=status.HTTP_403_FORBIDDEN)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Register(APIView):
    permission_classes = [~IsAuthenticated]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save(is_active=False)
            AuthenticationCode.objects.create(user=user)
            authentication_code = authentication.generate_code()
            authentication.set_and_send_code(user, authentication_code)
            return Response({'user_id': user.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        serializer = AuthenticationCodeSerializer(data=request.data)
        if serializer.is_valid():
            user_id = serializer.data['user_id']
            authentication_code = serializer.data['code']
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return Response({}, status=status.HTTP_404_NOT_FOUND)
            if authentication.check_code(user, authentication_code):
                user.is_active = True
                user.save()
                token = Token.objects.get_or_create(user=user)[0]
                return Response({'token': token.key}, status=status.HTTP_200_OK)
            return Response({}, status=status.HTTP_403_FORBIDDEN)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
