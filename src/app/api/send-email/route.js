import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { formData, signatureData, action } = body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your-app-password',
      },
    });

    let subject, htmlContent;

    if (action === 'form_submit') {
      subject = 'Formular 230 - Nou Completat';
      htmlContent = `
        <h2>Formular 230 - Date Personale</h2>
        <h3>Date Personale:</h3>
        <ul>
          <li><strong>Nume:</strong> ${formData.nume || 'N/A'}</li>
          <li><strong>Inițiala tatălui:</strong> ${formData.initialaTatalui || 'N/A'}</li>
          <li><strong>Prenume:</strong> ${formData.prenume || 'N/A'}</li>
          <li><strong>CNP:</strong> ${formData.cnp || 'N/A'}</li>
          <li><strong>Email:</strong> ${formData.email || 'N/A'}</li>
          <li><strong>Telefon:</strong> ${formData.telefonPrefix || ''} ${formData.telefon || 'N/A'}</li>
        </ul>
        
        <h3>Adresă:</h3>
        <ul>
          <li><strong>Localitate:</strong> ${formData.localitate || 'N/A'}</li>
          <li><strong>Județ:</strong> ${formData.judet || 'N/A'}</li>
          <li><strong>Stradă:</strong> ${formData.strada || 'N/A'}</li>
          <li><strong>Număr:</strong> ${formData.numar || 'N/A'}</li>
        </ul>
        
        <h3>Perioadă de redirecționare:</h3>
        <p>${formData.perioada === '1' ? '1 an' : formData.perioada === '2' ? '2 ani' : 'Neselectat'}</p>
        
        <h3>Acorduri:</h3>
        <ul>
          <li><strong>Acord GDPR:</strong> ${formData.acordGDPR ? 'Da' : 'Nu'}</li>
          <li><strong>Acord comunicare:</strong> ${formData.acordComunicare ? 'Da' : 'Nu'}</li>
          <li><strong>Acord email:</strong> ${formData.acordEmail ? 'Da' : 'Nu'}</li>
        </ul>
        
        ${signatureData ? '<p><strong>Semnătură:</strong> Inclusa în attachment</p>' : ''}
      `;
    } else if (action === 'download_image') {
      subject = 'Formular 230 - Imagine Descărcată';
      htmlContent = `
        <h2>Formular 230 - Imagine Completată Descărcată</h2>
        <h3>Date Personale:</h3>
        <ul>
          <li><strong>Nume:</strong> ${formData.nume || 'N/A'}</li>
          <li><strong>Prenume:</strong> ${formData.prenume || 'N/A'}</li>
          <li><strong>CNP:</strong> ${formData.cnp || 'N/A'}</li>
          <li><strong>Email:</strong> ${formData.email || 'N/A'}</li>
          <li><strong>Telefon:</strong> ${formData.telefon || 'N/A'}</li>
          <li><strong>Localitate:</strong> ${formData.localitate || 'N/A'}</li>
          <li><strong>Județ:</strong> ${formData.judet || 'N/A'}</li>
          <li><strong>Stradă:</strong> ${formData.strada || 'N/A'}</li>
          <li><strong>Număr:</strong> ${formData.numar || 'N/A'}</li>
        </ul>
        <p>Utilizatorul a descărcat imaginea completată cu datele sale.</p>
      `;
    } else {
      subject = 'Formular 230 - Notificare';
      htmlContent = '<p>Un formular 230 a fost procesat.</p>';
    }

    const attachments = [];
    if (signatureData) {
      const base64Data = signatureData.replace(/^data:image\/\w+;base64,/, '');
      attachments.push({
        filename: 'semnatura.png',
        content: Buffer.from(base64Data, 'base64'),
        contentType: 'image/png',
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: 'carinatanaselea993@gmail.com',
      subject: subject,
      html: htmlContent,
      attachments: attachments,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

