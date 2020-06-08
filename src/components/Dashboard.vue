<template>
    <div>
        <Business />
        <ChatBubble />
        <Features />
        <Widget />
    </div>
</template>


<script>
import Business from './../components/settings/Business';
import ChatBubble from './../components/settings/ChatBubble';
import Features from './../components/settings/Features';
import Widget from './../components/settings/Widget';


export default {
    components: {
        Business,
        ChatBubble,
        Features,
        Widget
    },
    props: ["location"]
}
</script>