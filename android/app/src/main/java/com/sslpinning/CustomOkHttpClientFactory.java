package com.sslpinning;

import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;

import okhttp3.OkHttpClient;

public class CustomOkHttpClientFactory implements OkHttpClientFactory {
    public OkHttpClient createNewNetworkModuleClient() {
        OkHttpClient.Builder builder = OkHttpClientProvider.createClientBuilder()
                .addInterceptor(new PinningInterceptor());

        OkHttpClient replacementClient = builder.build();
        return replacementClient;
    }
}
