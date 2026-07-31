// KidCode Interactive Controller
document.addEventListener('DOMContentLoaded', () => {
  console.log("KidCode Pro initialized.");

  const workspace = document.getElementById('workspace');
  const robot = document.getElementById('robot');
  const runBtn = document.getElementById('run-code');
  const clearBtn = document.getElementById('clear-code');

  if (workspace && runBtn) {
    let sequence = [];

    document.querySelectorAll('.block-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        const label = btn.innerText;
        sequence.push(action);

        const tile = document.createElement('div');
        tile.style.cssText = `
          background: #4F46E5;
          color: white;
          padding: 8px 14px;
          border-radius: 8px;
          border: 2px solid #0F172A;
          font-weight: bold;
          font-size: 0.9rem;
          box-shadow: 0 2px 0 #0F172A;
        `;
        tile.innerText = label;
        workspace.appendChild(tile);
      });
    });

    runBtn.addEventListener('click', () => {
      if (sequence.length === 0) {
        alert("Pick at least one block to build a program!");
        return;
      }

      let i = 0;
      const interval = setInterval(() => {
        if (i >= sequence.length) {
          clearInterval(interval);
          setTimeout(() => alert("Program Executed Successfully! 🎉"), 200);
          return;
        }

        const action = sequence[i];
        if (action === 'left') robot.style.transform = 'translateX(-50px)';
        else if (action === 'right') robot.style.transform = 'translateX(50px)';
        else if (action === 'jump') robot.style.transform = 'translateY(-40px)';
        else if (action === 'spin') robot.style.transform = 'rotate(360deg)';

        setTimeout(() => { robot.style.transform = 'none'; }, 350);
        i++;
      }, 650);
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        sequence = [];
        workspace.innerHTML = '';
        if (robot) robot.style.transform = 'none';
      });
    }
  }

  // Form submission handling
  const form = document.getElementById('kidcode-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = document.getElementById('form-feedback');
      const name = document.getElementById('child-name').value;

      feedback.style.display = 'block';
      feedback.style.background = '#10B981';
      feedback.style.color = 'white';
      feedback.style.padding = '1rem';
      feedback.style.borderRadius = '12px';
      feedback.style.fontWeight = 'bold';
      feedback.style.marginTop = '1rem';
      feedback.innerHTML = `Success! Welcome aboard, ${name || 'Coder'}! 🚀`;

      form.reset();
    });
  }
});