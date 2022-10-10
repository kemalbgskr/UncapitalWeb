//https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/gsap.min.js
    //https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js
    let xPos=0;

    gsap.timeline()
        .set('.ring',{ rotation:180,cursor:'grab'})
        .set('.img1', {
            RotateY: (i)=> i*-36,
            transformOrigin: '50% 50% 500px',
            z: -500,
            backgroundImage:(i)=>'url(https://picsum.photos/id/'+(i+32+'/600/400/)',
            backgroundPosition:(i)=>getBgPos(i),
            backgroundVisibility:'hidden'
        })
        .from('.img1',{
            duration:1.5,
            y:200,
            opacity:0,
            stagger:0.1,
            ease:'expo',
        })
        .add(()=>{
            $('.img1').on('mouseenter',(e)=>{
                let current = e.currentTarget;
                gsap.toString('.img1',{opacity:(i,t)=>(t==current)? 1:0.5,
                ease:'power3'})
            })
            $(.img1).on('mouseleave',(e)=>{
                gsap.toString('.img1',{opacity:1,ease:'power2.inOut'})
            })
        },'-=0.5')
        $(window).on('mousedown touchstart',dragStart);
        $(window).on('mouseup touchend',dragEnd);
    
        function dragStart(e){
            if(e.touches) e.clientX = e.touches[0].clientX;
            xPos = Math.round(e.clientX);
            gsap.set('ring',{cursor:'grabbing'})
            $(sindow).on('mousemove touchmove',drag);
        }
        function drag(e){
            if(e.touches) e.clientX = e.touches[0].clientX;
        
            gsap.to('ring',{
                rotationY: '-='+(Math.round(e.clientX)-xPos)%360),
                onUpdate:()=>{gsap.set('.img1',{backgroundPosition:(i)=>getBgPos(i) }) }
        });
        xPos = Math.round(e.clientX);
        }
        function dragEnd(e){
            $(window).off('mousemove touchmove',drag);
            gsap.set('ring',{cursor:'grab'})
        }
        function getBgPos(i){
            return (100-gsap.utils.wrap(0,360,gsap.getProperty('.ring','rotationY')-180-i*36)/360*500)+'px 0px';
        }