from rest_framework import mixins, generics


class RetrieveCreateAPIView(mixins.RetrieveModelMixin,
                            mixins.CreateModelMixin,
                            generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
