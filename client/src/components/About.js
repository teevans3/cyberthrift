import React from 'react'
import styled from 'styled-components';

import CardImage1 from '../images/CardImage1.jpg';
import CardImage2 from '../images/CardImage2.jpg';
import CardImage3 from '../images/CardImage3.jpg';

const AboutCards = [
    {
        image: CardImage1,
        header: 'Who we are',
        info: 'Euismod nisi porta lorem mollis. Non enim praesent elementum facilisis. Posuere morbi leo urna molestie at elementum. Mauris sit amet massa vitae. Venenatis urna cursus eget nunc scelerisque viverra. Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Ornare massa eget egestas purus. Sit amet justo donec enim diam vulputate ut pharetra. Id interdum velit laoreet id donec ultrices. Tristique magna sit amet purus gravida quis. Mauris in aliquam sem fringilla ut morbi tincidunt augue. Suspendisse sed nisi lacus sed. Vel turpis nunc eget lorem dolor sed viverra ipsum nunc. Praesent tristique magna sit amet purus gravida quis blandit turpis.'
    },
    {
        image: CardImage2,
        header: 'Clothes for anyone, anywhere',
        info: 'Euismod nisi porta lorem mollis. Non enim praesent elementum facilisis. Posuere morbi leo urna molestie at elementum. Mauris sit amet massa vitae. Venenatis urna cursus eget nunc scelerisque viverra. Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Ornare massa eget egestas purus. Sit amet justo donec enim diam vulputate ut pharetra. Id interdum velit laoreet id donec ultrices. Tristique magna sit amet purus gravida quis. Mauris in aliquam sem fringilla ut morbi tincidunt augue. Suspendisse sed nisi lacus sed. Vel turpis nunc eget lorem dolor sed viverra ipsum nunc. Praesent tristique magna sit amet purus gravida quis blandit turpis.'
    },
    {
        image: CardImage3,
        header: 'Get involved',
        info: 'Euismod nisi porta lorem mollis. Non enim praesent elementum facilisis. Posuere morbi leo urna molestie at elementum. Mauris sit amet massa vitae. Venenatis urna cursus eget nunc scelerisque viverra. Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Ornare massa eget egestas purus. Sit amet justo donec enim diam vulputate ut pharetra. Id interdum velit laoreet id donec ultrices. Tristique magna sit amet purus gravida quis. Mauris in aliquam sem fringilla ut morbi tincidunt augue. Suspendisse sed nisi lacus sed. Vel turpis nunc eget lorem dolor sed viverra ipsum nunc. Praesent tristique magna sit amet purus gravida quis blandit turpis.'
    }
]

const About = () => {
    return (
        <AboutContainer>
            <a id="about"></a>
            {AboutCards.map((card, index) => {
                return (
                    <InfoCard switch={(index % 2 === 1) ? true : false}>
                        <CardImage src={card.image} />
                        <CardText>
                            <AboutHeader>
                                {card.header}
                            </AboutHeader>
                            <AboutInfo>
                                {card.info}
                            </AboutInfo>
                        </CardText>
                    </InfoCard>
                )
            })}
        </AboutContainer>
    )
}

export default About;

const AboutContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`

const InfoCard = styled.div`
    display: flex;
    margin-bottom: 3rem;
    flex-direction: column;
    @media (min-width: 75rem) {
        flex-direction: ${props => props.switch ? 'row-reverse' : 'row'}
    }
    
`

const CardImage = styled.img`
    width: 50%;

    @media (max-width: 74.938rem) {
        width: 80%;
        margin: auto;
    }

`

const CardText = styled.div`
    width: 50%;
    padding: 3rem;

    @media (max-width: 74.938rem) {
        width: 80%;
        margin: auto;
        padding: 5rem 0 0 0;
    }
`

const AboutHeader = styled.p`
    font-size: 3rem;
    text-align: left;
    margin: 0;
`

const AboutInfo = styled.p`
    text-align: left;
    font-size: 1.2rem;
    margin-bottom: 4rem;
`